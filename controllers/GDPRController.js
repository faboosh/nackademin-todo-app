const userModel = require('../models/userModel');
const todoModel = require('../models/todoModel');
const todoListModel = require('../models/todoListModel');
const utils = require('./controllerUtils');

const userController = {
    getUserData: async (req, res) => {
        try {
            if(!req.user) throw new Error('No user');

            const {_id} = req.user;

            const userData = {
                todos: await todoModel.find({createdByID: _id}, { __v: 0 }),
                todoLists: await todoListModel.find({createdByID: _id}, { __v: 0 }),
                user: await userModel.find({_id}, { passwordHash: 0, __v: 0 })
            }

            res.status(200).json(userData);       
            
        } catch(err) {
            console.error(err.message);
            res.status(500).json({message: "could not complete request"})
        }
    }
}

module.exports = userController