
const authService = require('../services/authen.service');

module.exports = that = {
    generateToken: () => {
        try {

        } catch (error) {

        }
    }

    ,
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);

            if (!result.success) {
                return res.status(result.code).json({
                    code: result.code,
                    message: result.message,
                })
            }
            return res.status(result.code).json({
                code: result.code,
                message: result.message,
                user: result.user
            })
        } catch (error) {
            console.log(err.message)
        }
    }
    ,

    register: async (req, res) => {
        try {
            const {
                username,
                password
            } = req.body;

            const result = await authService.register(username, password);
            console.log(`result:: ${result}`)

            if (!result.success) {
                return res.status(400).json(
                    {
                        message: result.message,
                        status: result.status
                    }
                );
            }

            res.status(200).json(
                {
                    message: result.message,
                    status: true,
                    links: {
                        "login": {
                            "url": "http://localhost:3000/auth/login",
                            "method": "post",
                            "param": {
                                "username": "exam@gmail.com",
                                "password": "password123"
                            }
                        }
                    }
                }
            );

        } catch (err) {
            console.log(err.message)
        }
    }
    ,

    googleCallback: async (req, res) => {
        try {
            const user = await authService
                .authenticateGoogleCallback(req, res);
            res.json({
                message: true,
                user
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}

