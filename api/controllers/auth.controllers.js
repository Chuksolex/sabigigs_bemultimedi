import express from "express"
import User from "../models/user.model.js";
//hide our password
import bcrypt from "bcrypt";
import mongoose from "mongoose";
//use json webtoken here to protect user data
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { sendVerificationEmail } from "../utils/createMailTransporter.js";
import crypto from "crypto";
import validator from "validator";



// export const register = async (req,res,next) => {

//     try {

//         const hash = bcrypt.hashSync(req.body.password, 5);

//         const newUser = new User({
//                             ...req.body,
//                              password: hash});

//          await newUser.save();         

//         res.status(201).send("User successfully created");
        
//     } catch (err) {
//         next(err)
        
//     }

// };


export const register = async (req, res, next) => {
  try {
    const email=  req.body.email;
    let newUser = await User.findOne({email});
    if (newUser)
    return res.send("User with given Email exists!");

    const hash = bcrypt.hashSync(req.body.password, 5);

     newUser = new User({
      ...req.body,
      password: hash,
      emailToken:  crypto.randomBytes(16).toString('hex')
     });
     if (!validator.isEmail(email))
     return res.status(400).json("Email Must be valid")
     
    await newUser.save();
    res.status(201).send("User successfully created. Please check your email for verification.");


       
   
  } catch (err) {
    next(err);
  }
};



export const verifyEmail = async (req, res, next) => {
   
  
    try {
      const emailToken = req.query.emailToken; 
      console.log(emailToken);
      if (!emailToken)  return res.status(404).json("There is no email token");

      const user = await User.findOne({emailToken});
    
     //const user = User.findOneAndUpdate({emailToken}, { $set: { emailToken: null, isVerified: true}}, {new:true})
       if (user){
        user.emailToken = null;
         user.isVerified= true;
      
        await user.save();
          //const userId = user._id;
       // const token = jwt.sign({userId}, process.env.JWT_EMAIL_VERIFICATION_SECRET);

        res.status(201).json({
          userId: user._id,
          username: user.username,
          email: user.email,         
          isVerified: user?.isVerified
        })
      }else res.status(404).json("Email verification failed, invalid token!")
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message)
    }
  };
  


export const login = async (req,res,next) =>{
    //Todo
        try {
          const user = await User.findOne({username:req.body.email});
          
          if(!user) return next(createError(404, "User not found"));

          if (!user.isVerified) {
            return next(createError(403, "Email not verified. Please check your email for verification."));
          }

          const isCorrect = bcrypt.compareSync(req.body.password, user.email);
          if (!isCorrect) return next(createError(400, "Wrong password or username!"));

          const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
                  }, process.env.JWT_KEY)

          const {password, ...info} = user._doc;

            res.cookie("accessToken", token, {
                httpOnly: true,
                
            }).status(200).send(info);

        } catch (err) {
            next(err)
            
        }
};

export const logout = async (req,res) =>{
    
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true
    }).status(200)
    .send("User has been logged out")

}