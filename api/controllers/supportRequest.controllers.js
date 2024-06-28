import SupportRequest from "../models/supportRequest.model.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import User from "../models/user.model.js";

const createSupportRequest = async (req, res) => {
  try {
    const { title, description, attachmentUrl, user } = req.body;
    const person = await User.findById(user);

    if (!person) {
      return res.status(404).send("No user with your details on our database");
    }

    const newSupportRequest = new SupportRequest({
      title,
      description,
      attachmentUrl,
      user, // Save the user ID with the request
    });

    await newSupportRequest.save();

    await sendNotificationEmail({
      recipientEmail: "chuks4flourish@gmail.com",
      subject: "Support Request",
      message: description,
    });

    await sendNotificationEmail({
      recipientEmail: person.email,
      subject: "We Got Your Support Request",
      message: `Dear ${person.name}, we have received your request and shall respond in the earliest possible time.`,
    });

    res.status(200).json({ message: 'Support request submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit support request' });
  }
};

export default createSupportRequest;
