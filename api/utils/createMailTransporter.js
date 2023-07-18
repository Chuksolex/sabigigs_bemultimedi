import nodemailer from "nodemailer";

// Create a Nodemailer transporter
 const createMailTransporter = async() => {
     const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: 'chukwumaoleka@outlook.com',
        pass: 'Fadama1@biz',
      },
      tls: {
        rejectUnauthorized: false,
      },
      //secure: false,
      debug: true,

     
    });
    return transporter;
 
  }
  export default createMailTransporter  ;
