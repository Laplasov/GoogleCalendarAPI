const nodemailer = require('nodemailer');

// replace with your own email address and password
const EMAIL = 'joncontactmail@gmail.com';
const PASSWORD = 'hrkvwmhteidaidtu';

// create a transporter using Gmail SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// send an email
const sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL,
      to: 'yandire@gmail.com',
      subject: 'Test email',
      text: 'This is a test email.',
    });
    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error(err);
  }
};

// call the sendEmail function
sendEmail();
