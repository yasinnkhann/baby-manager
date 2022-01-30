const nodemailer = require('nodemailer');

export default function handler(req, res) {
  const email = req.body;
  // Create random hash
  // Create firebase query to store hash,main user id/email, provided email to invite
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_SERVER_EMAIL,
      pass: process.env.NEXT_PUBLIC_SERVER_EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NEXT_PUBLIC_SERVER_EMAIL,
    to: email,
    subject: 'Team Flareon is the best!!!',
    text: "You are invited to manage {users name}'s babies. Click the following link to log in or sign up to manage his/her babies! \n{link}",
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Email sent successfully');
    }
  });

  // const email = req.body;
  res.status(200).json({ name: 'John Doe' });
}
