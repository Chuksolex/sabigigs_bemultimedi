import nodemailer from "nodemailer";

// Create a Nodemailer transporter
export default const createMailTransporter = async() => {
  
     const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },

   
    });
    return transporter;
 
  }
    
