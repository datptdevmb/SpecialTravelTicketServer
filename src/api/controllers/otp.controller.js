
const otpService = require('../services/otp.service')

module.exports = {

    createOpt: async (req, res) => {
        const {
            username
        } = req.body;

        const otp = await otpService.createOpt(username);
        const result = await otpService.sendOtpToUser(otp, username);
    }
    ,
    verifyOtp: async (req, res) => {
        const { username, otp } = req.body;
        const result = await otpService.verifyOtp(username,otp);
        const {} = result;
        
    }
    ,
}