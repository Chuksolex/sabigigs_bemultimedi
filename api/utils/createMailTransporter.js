import nodemailer from "nodemailer";

const createMailTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'chukwumaoleka@outlook.com',
      pass: 'Fadama1@biz', // Replace with your actual password or app-specific password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
};
export default createMailTransporter
