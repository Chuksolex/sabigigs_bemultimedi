import SupportRequest from "../models/supportRequest.model.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import User from "../models/user.model.js";

const createSupportRequest = async (req, res) => {
  try {
    const { title, description, attachmentUrl, user } = req.body;
    console.log("upload url: ", attachmentUrl);
    if (!user) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const person = await User.findById(user);

    if (!person) {
      return res.status(404).json({ error: "No user with your details in our database" });
    }
    
    const newSupportRequest = new SupportRequest({
      title,
      description,
      attachmentUrl,
      user, // Save the user ID with the request
    });

    await newSupportRequest.save();
    const message = "User with name and email : " + person.name && person.email + "wrote " + description + "Evidence link: " + attachmentUrl;
    await sendNotificationEmail(
      "chuks4flourish@gmail.com",
      "Support Request",
      message
    );
     const messageDUser = "Dear " + person.name + ", we got your support request and will respond to it in the earliest possible time.";
    
    await sendNotificationEmail(
      person.email,
      "We Got Your Support Request",
      messageDUser
    );

    res.status(200).json({ message: 'Support request submitted successfully' });
  } catch (error) {
     console.error('Error in createSupportRequest:', error); // Log the error details
    let errorMessage = 'Failed to submit support request';
    if (error.message.includes('SMTP')) {
      errorMessage = 'Error sending notification email';
    } else if (error.message.includes('validation failed')) {
      errorMessage = 'Validation error: ' + error.message + 'logout and login then try again';
    } else if (error.message.includes('Network')) {
      errorMessage = 'Network error: Please check your connection';
    }
    res.status(500).json({ error: errorMessage });
  }
  
};

export default createSupportRequest;
