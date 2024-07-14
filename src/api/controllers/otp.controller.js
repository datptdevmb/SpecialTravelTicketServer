
const otpService = require('../services/otp.service')


module.exports = {

    createOpt: async (req, res) => {
        try {
            const {
                username,
                method
            } = req.body;

            const response = otpService.createOpt(username,method);
            return res.json(response);
          
        } catch (error) {
            console.error(error.message);
            res.json({ message: error.message });
        }
    }
    ,

}