const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const _Otp = require('../models/otp.model');
const _User = require('../models/user.model');
const { sendOtpEmail } = require('../helpers/email.helper');
const { sendOtpSms } = require('../helpers/sms.helper');


module.exports = that = {

    createOpt: async (username, method) => {
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
                }
            );

            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(otp, salt);
            await _Otp.create({
                username,
                otp: hashOtp
            });
            if (method === 'email') {
                console.log('dddd');
                await sendOtpEmail(username, otp);
            } else if (method === 'sms') {
                await sendOtpSms(isExistUser.phone, otp);
            }

            return {
                success: true,
                message: "OTP đã được gửi"
            };

        } catch (error) {
            console.error(error.message)
            return {
                success: false,
                message: "Lỗi khi tạo OTP",
                error: error.message
            };
        }
    }
    ,
    verifyOtp: async (username,otp) => {

    }
}
