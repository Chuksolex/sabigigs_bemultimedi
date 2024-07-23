import express from "express"
import livetutorRegister from "../models/livetutorRegister.model.js";
import mongoose from "mongoose";
import createError from "../utils/createError.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import validator from "validator";

 const livetutorRegisterController = async (req, res, next) => {
  const { parent_name, child_name, phone, email, prefered_time, plan } = req.body;

  // Save the registration to the database
  const registration = new livetutorRegister({
    parent_name,
    child_name,
    phone,
    email,
    prefered_time,
    plan,
  });
if (!validator.isEmail(email))
     return res.status(400).json("Email Must be valid. Check email and try again.")
     
  try {
    await registration.save();

    // Set up your email transporter
 const recipientEmail = 'info@prettygigs.com.ng';

    const subject = 'New Live Tutor Client';
  const message = `Parent Name: ${parent_name}\nChild Name: ${child_name}\nPhone: ${phone}\nEmail: ${email}\nPreferred Time: ${prefered_time}\nPlan: ${plan}`;
    await sendNotificationEmail(recipientEmail, subject, message);
  
    res.status(200).send('Registration successful. Complete registration by making payment');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default livetutorRegisterController;
