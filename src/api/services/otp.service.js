const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const _Otp = require('../models/otp.model');
const _User = require('../models/user.model');
const { isEmail, isPhone } = require('../validations/authen.validation');
const { getMailOptions, transporter } = require('../../config/nodemailer.config');
module.exports = that = {

    createOpt: async (username) => {
        try {
            const isExistUser = _User.findOne({ username });
            if (!isExistUser) {
                return {
                    success: false,
                    message: "user ko tonf taij trong he thong",
                }
            }
            const otp = otpGenerator.generate(6,
                {
                    digits: true,
                    alphabets: false,
                    upperCase: false,
                    specialChars: false
                });

            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(otp, salt);
            const Otp = await _Otp.create({
                username,
                otp: hashOtp
            });
            return otp;
        } catch (error) {
            console.error(error.message)
            return error
        }
    }
    ,
    verifyOtp: async (username, otp) => {
        try {
            const isExist = _Otp.findOne({ username, otp });
            if (!isExist) {
                return {
                    msg: "otp khong dung"
                }
            }
        } catch (error) {
            console.error(error.message);
            return error
        }
    }
    ,
    sendOtpToUser: async (otp, username) => {
        if (isEmail(username)) {
            return sendOtpFromEmail(username, otp);
        }
        if (isPhone(username)) {
            return sendOtpFromPhoneNumber(username, otp);
        }

    }
}

function sendOtpFromEmail(email, otp) {
    const mailOptions = getMailOptions(email, otp);
    let mailTransporter = nodemailer
        .createTransport(
            transporter
        );
    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
}

function sendOtpFromPhoneNumber(phoneNumber, otp) {

}