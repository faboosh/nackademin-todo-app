const userModel = require('../models/userModel');
const todoModel = require('../models/todoModel');
const todoListModel = require('../models/todoListModel');
const utils = require('./controllerUtils');

const userController = {
    getAll: async (req, res) => {
        try {
            const users = 
                await utils.sort({
                    req,
                    model: userModel,
                    sortKey: 'username'
                })
            res.status(200).json(users);       
            
        } catch(err) {
            console.error(err.message);
            res.status(500).json({message: "could not complete request"})
        }
    },

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
    }, 

    delete: async (req, res) => {
        const _id = req.params._id ? req.params._id : req.user._id;

        if(_id) {
            try {
                await Promise.all([
                    todoModel.deleteMany({createdByID: _id}),
                    todoListModel.deleteMany({createdByID: _id}),
                    userModel.deleteOne({_id})
                ])
                res.status(200).json({message: "User deleted"});
            } catch(err) {
                res.status(500).json({message: "user could not be deleted"})
            }
        } else {
            res.status(400).json({message: "missing user ID"})
        }
    }
}

module.exports = userController