import express from "express"
import User from "../models/user.model.js";
//hide our password
import bcrypt from "bcrypt";
import mongoose from "mongoose";
//use json webtoken here to protect user data
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
import sendPasswordResetEmail from "../utils/sendPasswordResetEmail.js";
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
    //WE SEND EMAIL VERIFICATION
    sendVerificationEmail(newUser);
    res.status(201).send("User successfully created. Please check your email for verification.");
  
    


       
   
  } catch (error) {
    next(error);
  }
};



export const verifyEmail = async (req, res, next) => {
   
  
    try {
      const emailToken = req.query.emailToken; 
      //console.log(emailToken);
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
          const user = await User.findOne({email:req.body.email});
          
          if(!user) return next(createError(404, "User not found"));

          if (!user.isVerified) {
            return next(createError(403, "Email not verified. Please check your email for verification."));
          }

          const isCorrect = bcrypt.compareSync(req.body.password, user.password);
          if (!isCorrect) return next(createError(400, "Wrong password or username!"));

          const token = jwt.sign({
            id: user._id,
            isVerified: user.isVerified===true,
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



export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json('User not found');
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(16).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 360000000; // Token expiration time: 1 hour

    // Save the user with the reset token and expiration
    await user.save();

    // Send password reset email
    sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json('Password reset email sent');
  } catch (error) {
    next(error);
    console.log(error)
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params; 
    const { password } = req.body;

    // Find user by reset token and check token expiration
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json('Invalid or expired reset token');
    }

    // Update user's password
    user.password = bcrypt.hashSync(password, 5);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json('Password reset successful');
  } catch (error) {
    next(error);
  }
};