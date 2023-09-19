import createMailTransporter  from "./createMailTransporter.js";
import dotenv from "dotenv";

 const sendNotificationEmail = async (recipientEmail, subject, message) => {
    const transporter = await createMailTransporter();




//send mail
const mailOptions = {
    from: `phaxnetgigs  <chukwumaoleka@outlook.com>`,
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
export default sendNotificationEmail