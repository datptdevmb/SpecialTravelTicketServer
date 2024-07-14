const express = require('express');
const otpRoute = express.Router();
const otpController = require('../controllers/otp.controller');
const authenController = require('../controllers/authen.controller');

otpRoute.post('/createOtp', otpController.createOpt);
// otpRoute.post('/verifyOtp',authenController.verifyOtp);

module.exports = otpRoute