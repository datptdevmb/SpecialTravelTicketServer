const express = require('express');
const otpRoute = express.Router();
const optService = require('../services/otp.service');

otpRoute.post('/createOtp',optService.createOpt)

module.exports = otpRoute