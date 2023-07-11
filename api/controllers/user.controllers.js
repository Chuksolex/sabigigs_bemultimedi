import express from "express";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";


export const deleteUser = async (req,res, next) =>{

        const user = await User.findById(req.params.id)


       
           if (req.userId !== user._id.toString()){
           return next(createError(403, "You can only delete your account!")
            );
           }
           await User.findByIdAndDelete(req.params.id);
           res.status(200).send("Deleted Account successfully");
      };



   // export const updateUserToSeller = async (req,res,next) =>{        
         
   //      const user = await User.findById(req.userId);

   //      if(user) {
   //       user.isSeller = true ;
   //       user.phone = req.body.phone || user.phone;
   //       user.desc= req.body.desc || user.desc;
   //       user.username;
   //       user.password;
   //       user.img;
   //       user.country;
   //       user._id;
   //       user.timestamps;
        
   //      const updatedUser = user.save();
         
   //      res.json({
   //       _id:updatedUser._id,
   //       isSeller: updatedUser.isSeller,
   //      })

        

   //    }else {
   //       res.status(401).json(
   //        {  success: false,
   //          msg: "User not found"}
   //       )
   //    }
   //    //    res.status(200).send("You successfully updated to Seller Account");   
        
         
     
         
       
   // }

   // userController.js



// Update user data
export const updateUserToSeller = async (req, res) => {
  const { userId } = req.params.id;
  const { isSeller, desc } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's data
    user.isSeller = isSeller;
    user.desc = desc;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'User data updated', user });
  } catch (error) {
    console.error('Failed to update user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
};



        
      


       export const getUser = async (req,res,next) =>{

         const user = await User.findById(req.params.id) || await User.findOne(req.params.emailToken);

            res.status(200).send(user);
       };
    

    
