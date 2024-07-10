const express = require('express');
const otpRoute = express.Router();
const otpController = require('../controllers/otp.controller');

otpRoute.post('/createOtp', otpController.createOpt);
otpRoute.post('/verifyOtp',otpController.verifyOtp);

module.exports = otpRoute