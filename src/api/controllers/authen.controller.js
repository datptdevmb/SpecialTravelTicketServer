
const userService = require('../services/user.service');


module.exports = that = {


    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await userService.login(username, password);
            const {
                code,
                msg,
                status,
                accessToken,
                refesToken
            } = result;

            return res.status(code).json(
                {
                    status,
                    msg,
                    accessToken: status ? accessToken : null,
                    refesToken: status ? refesToken : null,
                    links: status
                        ? {
                            "createOtp": {
                                "url": "http://localhost:3000/otp/createOtp",
                                "method": "post",
                                "param": {
                                    "username": "exam@gmail.com",
                                }
                            },
                            "verifyOtp ": {
                                "url": "http://localhost:3000/otp/verifyOtp",
                                "method": "get",
                                "param": {
                                    "otp": "000000",
                                    "username": "exam@gmail.com"
                                }
                            }
                        }
                        : []
                }
            )
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    ,
    register: async (req, res) => {
        try {
            const {
                username,
                password
            } = req.body;

            const result = await userService.register(username, password);
            const { code, msg, status } = result;

            return res.status(code).json(
                {
                    msg,
                    status,
                    links: status
                        ? {
                            "login": {
                                "url": "http://localhost:3000/auth/login",
                                "method": "post",
                                "param": {
                                    "username": "exam@gmail.com",
                                    "password": "password123"
                                }
                            }
                        }
                        : []
                }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    ,
    googleCallback: async (req, res) => {
        try {
            const user = await userService
                .authenticateGoogleCallback(req, res);
            res.json({
                message: true,
                user
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}

