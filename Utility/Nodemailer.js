
const nodemailer = require('nodemailer');

const sendMail = async (toEmail, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: toEmail,
      subject: 'Reset Your password',
      text: resetLink,
    };

    await transporter.sendMail(mailOptions);
    return {success: true};
  } catch (error) {
    console.error('Failed to send email:', error);
    return {success: false, error: 'Failed to send email'};
  }
};

module.exports = {sendMail};
