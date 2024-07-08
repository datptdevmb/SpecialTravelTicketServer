
const authService = require('../services/authen.service');

module.exports = that = {
    generateToken: () => {
        try {

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    ,

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            const { code, message, success } = result;

            return res.status(code).json(
                {
                    code,
                    status: success,
                    message,
                }
            )
        } catch (error) {
            console.error(error.message)
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

            const result = await authService.register(username, password);
            const { code, message, success } = result;

            if (!success) {
                return res.status(code).json(
                    {
                        message: message,
                        status: success
                    }
                );
            }

            return res.status(code).json(
                {
                    message: message,
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

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Internal server error' });
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
            console.error(error.message)
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}

