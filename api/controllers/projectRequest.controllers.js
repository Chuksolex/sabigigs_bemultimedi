// controllers/projectRequestController.js

import ProjectRequest from "../models/projectRequest.model.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import createError from "../utils/createError.js";

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

    // Create a new project request instance
    const projectRequest = new ProjectRequest({
      name,
      email,
      phone,
      projectDescription,
      startDate,
      currency,
      budget
    });

    // Save the project request to the database
    await ProjectRequest.save();

    // Send notification email about the new project request
    const recipientEmail = "chuks4flourish@gmail.com";
    const subject = "Project Request";
    const message = `User details: ${name}, ${email}, ${phone}. Message: ${projectDescription}. Proposed start date: ${startDate}. Budget: ${currency} ${budget}.`;

    await sendNotificationEmail(recipientEmail, subject, message);

    // Respond with a success message
    res.status(200).json({ message: 'New project request received successfully.' });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
