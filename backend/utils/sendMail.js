const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { compile } = require("handlebars");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    // service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

const sendMailNewsletter = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    // service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "./utils/templates/index.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: source,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMail, sendMailNewsletter };
