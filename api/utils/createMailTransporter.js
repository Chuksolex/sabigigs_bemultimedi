import nodemailer from "nodemailer";
import dotenv from "dotenv";
// Create a transporter object
const createMailTransporter = async () => {
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: `${process.env.GMAIL_ACCOUNT}`,
    pass: `${process.env.Nodemailer_App_Password}`,
  }
});
   return transporter;
};
export default createMailTransporter
