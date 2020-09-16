const userModel = require('../models/userModel');

const userController = {
    login: async (req, res) => {
        if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
            const { username, password } = req.body;
            try {
                const token = await userModel.login({ username, password });

                if(token) {
                    res.status(200).json(token);
                } else {
                    res.status(401).json({message: "invalid credentials"});
                }
            } catch(err) {
                console.error('error: ', err);
                res.status(500).json({message: "internal server error"})
            }
        } else {
            res.status(400).json({message: "missing credentials"})
        }
    },

    register: async (req, res) => {
        if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
            const { username, password } = req.body;

            try {
                const user = await userModel.register({ username, password });

                if(user) {
                    res.status(200).json(user);
                } else {
                    res.status(401).json({message: "invalid credentials"});
                }
            } catch(err) {
                res.status(500).json({message: "user could not be created", err})
            }
        } else {
            res.status(400).json({message: "missing credentials"})
        }
    } 
}

module.exports = userController;