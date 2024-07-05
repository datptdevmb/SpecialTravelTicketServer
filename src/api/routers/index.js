const authRout = require('../routers/authen');
const otpRoute = require('../routers/otp');
const express = require('express');
const router = express.Router();

router.use('/auth', authRout);
router.use('/otp', otpRoute);

module.exports = router