require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = that = {

    signAccessToken: async (userId) => {
        return new Promise((resolve, reject) => {
            const payload = { userId };
            const options = { expiresIn: '1h' };
            const secretKey = process.env.SECRETKEY;

            jwt.sign(payload, secretKey, options,
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        });
    }
    ,
    signRefreshToken: async (userId) => {
        return new Promise((resolve, reject) => {
            const payload = { userId };
            const options = { expiresIn: '1y' };
            const secretKey = process.env.SECRETKEY;

            jwt.sign(payload, secretKey, options,
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        });
    }
    ,
    verifyToken: async () => {

    }
}