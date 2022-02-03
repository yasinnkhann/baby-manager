/* eslint-disable import/no-anonymous-default-export */
const client = require('twilio')(
  process.env.NEXT_PUBLIC_REACT_APP_TWILIO_ACCOUNT_SID,
  process.env.NEXT_PUBLIC_REACT_APP_TWILIO_AUTH_TOKEN,
  process.env.NEXT_PUBLIC_MESSAGING_SERVICE_SID,
  process.env.NEXT_PUBLIC_REACT_APP_TWILIO_PHONE_NUMBER
);

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    client.messages
      .create({
        from: process.env.NEXT_PUBLIC_REACT_APP_TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body,
        scheduleType: 'fixed',
        sendAt: req.body.date,
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
        resolve();
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
        resolve();
      });
  });
};
