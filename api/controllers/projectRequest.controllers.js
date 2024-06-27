import express from "express"
import ProjectRequest from "../models/projectRequest.model.js";
import createError from "../utils/createError.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";


export const createProjectRequest = async (req, res, next) => {
try {
    const {
      name,
      email,
      phone,
      projectDescription,
      startDate,
      currency,
      budget
    } = req.body;

    const projectRequest = new ProjectRequest({
      name,
      email,
      phone,
      projectDescription,
      startDate,
      currency,
      budget
    });
  const recipientEmail= "chuks4flourish@gmail.com";
  const subject = "Project Request";
  const message = `User details:  (${name} ${email} ${phone}). Message: (${projectDescription}). Poposed start date: (${startDate}). Budget: (${currency} ${budget).`
  
    await projectRequest.save();


    // Send password reset email
    sendNotificationEmail(recipientEmail, subject, message);

    res.status(200).json('Got new project reequest from Prettygigs contact form.');
  } catch (error) {
    next(error);
    console.log(error)
  }
};



