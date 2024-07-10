

const passport = require('../../config/passport');
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const _User = require('../models/user.model');
const { isValidEmailorPhone, isValidPassword } = require('../validations/authen.validation');
const otpService = require('./otp.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = that = {

    generateToken: async (userId) => {
        const payload = { userId };
        const options = {
            expiresIn: '1h'
        }
        const secretKey = process.env.SECRETKEY;
        await jwt.sign(payload, secretKey, options,
            (error, token) => {
                if (error) return error
                return token;
            })
    },

    login: async (username, password) => {
        try {
            const query = { username, password }
            const sanitizedUsername = sanitize(query.username);
            const userExists = await _User.findOne({ username: sanitizedUsername });

            if (!userExists) {
                return createResponse(401, "tai khoan ko ton tai", false);
            }

            if (!userExists.isAcctive) {
                handleInactiveUser(username);
                return createResponse(401, "tai khoan chua kich hoat", false)
            }

            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return createResponse(401, "tai khoan mat khau ko dung", false);
            }

            return createResponse(200, "dang nhap thanh cong", true);
        } catch (error) {
            console.error(error.message)
            return createResponse(500, error.message, false)
        }
    }
    ,

    register: async (username, password) => {

        if (!isValidEmailorPhone(username)) {
            return createResponse(401, "Invalid username format. Must be a valid email or phone number.", false);
        }
        if (!isValidPassword(password)) {
            return createResponse(401, "mat khau phai tu 8 ki tu bao gom ki tu dac biet", false);
        }
        try {

            const userExists = await _User.findOne({ username });
            if (userExists) return createResponse(401, "Username already exists.", false);

            await createAccount(username, password);
            const otp = await otpService.createOpt(username);
            await otpService.sendOtpToUser(otp, username);
            return createResponse(200, "register sucessfull!", true);

        } catch (error) {
            console.error(error.message);
            return createResponse(500, error.message, false);
        }
    }
    ,

    authenticateGoogleCallback: async () => {
        return new Promise((resolve, reject) => {
            passport.authenticate('google', (error, user) => {
                if (error) {
                    return reject(error);
                }
                if (!user) {
                    return reject(new Error('Authentication failed'));
                }
                resolve(user);
            })(req, res, resolve);
        });
    }
};


async function createAccount(username, password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new _User({ username, password: hashedPassword });
        await newUser.save();
        console.log('User saved successfully:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
}

async function handleInactiveUser(username) {
    try {
        const otp = await otpService.createOpt(username)
        await otpService.sendOtpToUser(otp, username);
    } catch (error) {
        console.error('Error handling inactive user:', error.message);
    }
}

function createResponse(code, message, status) {
    return {
        code: code,
        smg: message,
        status: status
    }
}

