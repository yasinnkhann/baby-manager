const nodemailer = require('nodemailer');
// const crypto = require('crypto');

export default function inviteHandler(req, res) {
  // Create random token
  // Create firebase query to store hash,main user id/email, provided email to invite
  try {
    // console.log('req.body:', req.body);
    const token = req.body.token;
    const email = req.body.email;
    const name = req.body.name;
    // var token = crypto.randomBytes(8).toString('hex');

    const INVITE_LINK = `http://localhost:3000?token=${token}`;
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
      subject: `${name} has invited you to manage his/her babies!`,
      text: `You are invited to manage ${name}'s babies. Click the following link to log in or sign up to manage his/her babies! \n\n${INVITE_LINK}. \n\nOnly log in through this link to gain access to {users name}'s babies.`,
    };

    let data = transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log('Error:', err);
        res.status(400).end();
      } else {
        console.log('Email sent successfully');
        res.status(201).end();
      }
    });
  } catch (err) {
    console.log('Caught Error:', err);
    res.status(400).end();
  }
}
