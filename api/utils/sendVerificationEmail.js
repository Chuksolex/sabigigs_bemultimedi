import createMailTransporter  from "./createMailTransporter.js";

 const sendVerificationEmail = (user) => {
    const transporter = createMailTransporter();

//send mail
const mailOptions = {
    from: ` "Phaxnetgigs" <process.env.GMAIL_ACCOUNT>`,
      to: user.email, 
      subject: "Account Verification",
      html: `<p> Hell ${user.username}, verify your email by clicking on this link...</p>
      <a href=${preocess.env.EMAIL_VERIFICATION_ROUTE}/verify-email?emailToken=${user.emailToken}>Verify Your Email Account</a>`,

}


 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    }else {
        console.log("Verification Email sent");
    }
});
}
export default sendVerificationEmail