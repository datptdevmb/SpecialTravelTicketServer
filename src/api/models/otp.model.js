const { Schema, model } = require("mongoose");


const otpScheme = new Schema({
    username: String,
    otp: String,
    time: { type: Date, default: Date.now, index: { expires: 25 } }
}, {
    collection: "otp"
})
module.exports = model('otp', otpScheme)