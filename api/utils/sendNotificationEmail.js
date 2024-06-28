import createMailTransporter  from "./createMailTransporter.js";

 const sendNotificationEmail = async (recipientEmail, subject, message) => {
    const transporter = await createMailTransporter();

  // Configure the mailoptions object
const mailOptions = {
  from: `prettygigs  <chuks4flourish@gmail.com>`
  to: recipientEmail,
  subject: subject,
  text: message,
};


 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    }else {
        console.log("Conversation Email sent");
    }
});
}
export default sendNotificationEmail;


