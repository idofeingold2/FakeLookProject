const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const keys = require('../config/keys');
const emailLogic = require('../logic/email-logic');

const transporter = nodemailer.createTransport(keys.transport);

exports.sendEmail = async (to) => {
    try {
        await transporter.sendMail({
            to,
            from: 'fakelookproject@gmail.com',
            subject: 'Reset Password',
            html: `<div>
            <h1>Reseting Your Password</h1>
            <p>Click <a href="http://localhost:3000/reset-password-form">here</a> and you will be transfered to our reset password form</p>
            </div>`
        });
    } catch (err) {
        console.log(err);
    }
}

