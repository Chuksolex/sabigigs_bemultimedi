import createMailTransporter  from "./createMailTransporter.js";


 const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = await createMailTransporter();




//send mail
const mailOptions = {
    from: `prettygigs  <chuks4flourish@gmail.com>`,
      to: email, 
      subject: "Password Reset",
      
      html: `
      <p>Hello,</p>
      <p>A password reset request has been initiated for your account.</p>
      <p>Please click the following link to reset your password:</p>
      <a href="${process.env.EMAIL_VERIFICATION_URL_CLIENT}/reset-password/${resetToken}">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Regards,</p>
      <p>Paxnetgigs</p>
    `,
};


 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    }else {
        console.log("Verification Email sent");
    }
});
}
export default sendPasswordResetEmail
