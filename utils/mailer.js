const transporter = require('../config/nodemailer.config');

exports.sendRegisterUserMail = async (email) => {
    try {
        await transporter.sendMail({
            to: email,
            from: process.env.sendgridSender,
            subject: 'Register completed!',
            html: `<h1>User ${email} has been successfully created </h1>`
        })
    } catch (e) {
        throw Error(e);
    }
}

exports.sendResetPassword = async (email, token) => {
    try {
        await transporter.sendMail({
            to: email,
            from: process.env.sendgridSender,
            subject: 'Reset Password for FoodShop',
            html: `
            <p>You have requested a reset password</p>
            <p>Click on this link to reset it:  </p>
            <a href="http://localhost:3000/resetPassword/${token}"> Reset Password</a>`
        })
    } catch (e) {
        throw Error(e);
    }
}
