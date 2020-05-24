const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodeauth.service@gmail.com',
      pass: 'node123456'
    }

  });

  module.exports = function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'nodeauth.service@gmail.com',
        to,
        subject,
        text,
    };
    transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', res)
        }
      })
  };