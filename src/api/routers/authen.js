const express = require('express');
const router = express.Router();
const authController = require('../controllers/authen.controller')
const passport = require('passport');


// router.get('google', passport.authenticate('google', { scope: ['profile'] }));
// router.get('google/callback', authController.googleCallback);
router.post('/regis',authController.register);
router.post('/login',authController.login);
// router.post('/verifyOtp',authController.verifyOtp);


module.exports = router

