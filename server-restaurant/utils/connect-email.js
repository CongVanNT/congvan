const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  });
};

module.exports = { sendEmail };
