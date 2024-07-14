// // helpers/sms.helper.js
// const twilio = require('twilio');

// const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendOtpSms = (to, otp) => {
//     return client.messages.create({
//         body: `Your OTP code is ${otp}`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to,
//     });
// };

// module.exports = {
//     sendOtpSms,
// };
