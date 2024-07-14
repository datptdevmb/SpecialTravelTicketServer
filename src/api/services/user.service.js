

const passport = require('../../config/passport');
const bcrypt = require('bcrypt')
const {createResponse }= require('../helpers/createResponse.helper');
const sanitize = require('mongo-sanitize')
const { signAccessToken, signRefreshToken } = require('../helpers/jwt.helper');
const _User = require('../models/user.model');
const { isValidEmailorPhone, isValidPassword } = require('../validations/authen.validation');
require('dotenv').config();



module.exports = that = {

    login: async (username, password) => {
        try {
            const query = { username, password }
            const sanitizedUsername = sanitize(query.username);
            const user = await _User.findOne({ username: sanitizedUsername });

            if (!user) return createResponse(401, "tai khoan ko ton tai", false);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return createResponse(401, "tai khoan mat khau ko dung", false);


            const accessToken = await signAccessToken(user._id);
            const refesToken = await signRefreshToken(user._id);
            return createResponse(200, 'login thanh cong',true, {
                accessToken,
                refesToken
            })
        } catch (error) {
            console.error(error.message)
            return createResponse(500, error.message, false);
        }
    }
    ,

    register: async (username, password) => {

        try {
            if (!isValidEmailorPhone(username)) {
                return createResponse(401, "Invalid username format. Must be a valid email or phone number.", false);
            }
            if (!isValidPassword(password)) {
                return createResponse(401, "mat khau phai tu 8 ki tu bao gom ki tu dac biet", false);
            }
            const userExists = await _User.findOne({ username });
            if (userExists) return createResponse(401, "Username already exists.", false);

            await createAccount(username, password);
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



