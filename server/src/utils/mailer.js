var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: `${process.env.MAIL_HOST}`,
    port: `${process.env.MAIL_PORT}`,
    secure: `${process.env.MAIL_ENCRYPTION}`,
    auth: {
        user: `${process.env.MAIL_USERNAME}`,
        pass: `${process.env.MAIL_PASSWORD}`
    }
});

// var mailOptions = {
//     from: 'hi@gmail.com',
//     to: 'ru03244523131@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

exports.sendMail = function (mailOptions) {

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}