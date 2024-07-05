
const otpService = require('../services/otp.service')

module.exports = {

    createOpt: async (req, res) => {
        const {
            username
        } = req.body;
        
        const otp = await otpService.createOpt(username);
        const result = await otpService.sendOtpToUser(otp, username);
    }
}