import SupportRequest from "../models/supportRequest.model.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import User from "../models/user.model.js";

const createSupportRequest = async (req, res) => {
  try {
    const { title, description, attachmentUrl, user } = req.body;

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

    await sendNotificationEmail(
      "chuks4flourish@gmail.com",
      "Support Request",
      description
    );

    await sendNotificationEmail(
      person.email,
      "We Got Your Support Request",
      `Dear ${person.name}, we have received your request and shall respond in the earliest possible time.`
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
  }
};

export default createSupportRequest;
