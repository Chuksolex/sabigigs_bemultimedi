import createMailTransporter  from "./createMailTransporter.js";
import dotenv from "dotenv";

 const sendVerificationEmail = async (newUser) => {
    const transporter = await createMailTransporter();
    const verificationUrl = `${process.env.EMAIL_VERIFICATION_URL_CLIENT}/verify-email?emailToken=${newUser.emailToken}`;




//send mail
const mailOptions = {
    from: `prettygigs  <chuks4flourish@gmail.com>`,
      to: newUser.email, 
      subject: "Account Verification",
      
      html: `<p> Hello ${newUser.username}, verify your email by clicking on this link:
     <a>${verificationUrl}</a></p>`,

    };


 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    }else {
        console.log("Verification Email sent");
    }
});
}
export default sendVerificationEmail
