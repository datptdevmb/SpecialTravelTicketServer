const passport = require('../../config/passport');
const bcrypt = require('bcrypt');
const _User = require('../models/user.model');
const { isValidEmailorPhone, isValidPassword } = require('../validations/authen.validation');
const otpService = require('./otp.service');


module.exports = that = {

    login: async (username, password) => {
        try {
            const user = await _User.findOne({ username });

            if (!user) {
                return {
                    code: 401,
                    success: false,
                    message: 'tai khoan matkhau ko dung.'
                }
            }
            if (!user.isAcctive) {
                const otp = await otpService.createOpt(username);
                await otpService.sendOtpToUser(otp, username);
                return {
                    code: 401,
                    success: false,
                    message: 'tai khoan chua dc active',
                }
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    code: 401,
                    message: 'Invalid username or password.',
                    success: false
                };
            }
            return {
                code: 200,
                success: false,
                message: 'dang nhap thanh cong',
                user
            }

        } catch (error) {
            console.log(err)
        }
    }
    ,
    register: async (username, password) => {

        if (!isValidEmailorPhone(username)) {
            return {
                success: false,
                message: 'Invalid username format. Must be a valid email or phone number.'
            };
        }

        if (!isValidPassword(password)) {
            return {
                success: false,
                message: 'Password '
            };
        }
        try {

            const isExist = await _User.findOne({ username });
            if (isExist) {
                return {
                    success: false,
                    message: 'Username already exists.'
                }
            };

            await createAccount(username, password);
            const otp = await otpService.createOpt(username);
            console.log(`otp::${otp}`)
            await otpService.sendOtpToUser(otp, username);
            return {
                success: true,
                message: 'register sucessfull!'
            }

        } catch (error) {
            console.log(error.message);
        }
    }
    ,
    // authenticateGoogleCallback: async () => {
    //     return new Promise((resolve, reject) => {
    //         passport.authenticate('google', (err, user, info) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             if (!user) {
    //                 return reject(new Error('Authentication failed'));
    //             }
    //             resolve(user);
    //         })(req, res, resolve);
    //     });
    // }
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
    }
}

