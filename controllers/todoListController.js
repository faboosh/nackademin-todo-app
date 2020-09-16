const todoListModel = require('../models/todoListModel');
const todoModel = require('../models/todoModel');

const todoController = {
    get: async (req, res) => {
        const { _id } = req.params;

        todoListModel.get({_id})
            .then(data => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({message: "no todos found"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "could not get todos"})
            })  
    },

    getByID: async (req, res) => {
        const { listID } = req.params;

        todoListModel.findById(listID)
            .then(data => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({message: "no todos found"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "could not get todos"})
            })  
    },

    getAllAccessibleTodoLists: async (req, res) => {

    },

    create: async (req, res) => {
        let { title, sharedWith } = req.body;
        const { _id } = req.user;

        if(title && _id) {
            if(typeof sharedWith === 'undefined') sharedWith = [];

            todoListModel.create({title, createdByID: _id })
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })      
        } else {
            res.status(400).json({message: "invalid todo list formatting"})
        }
    },

    put: async (req, res) => {
        
        let { title, done, duedate } = req.body;
        let { _id } = req.params;
        let newTodo = {}; 

        if(_id) {
            if (title) newTodo.title = title;
            if (typeof done !== 'undefined') newTodo.done = done;
            if (duedate) newTodo.duedate = new Date(duedate);
    
            todoListModel.update(_id, newTodo)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json(err)
                }) 
        } else {
            res.status(400).json({ message: "no ID supplied" })
        }

    },

    delete: (req, res) => {
        let { _id } = req.params;

        if(_id) {    

            todoModel.deleteAllInList(_id)
                .then(() => {

                })
                .catch(err => {
                    res.status(500).json({message: "could not delete todos in todo list"})
                })
            todoListModel.delete(_id)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(500).json({message: "could not delete todo list"})
                })
        } else {
            res.status(400).json({ message: "no ID supplied" })
        }
    },

    getTodosInList: (req, res) => {
        const { listID } = req.params;

        if(listID) {
            todoModel.get({ listID })
                .then(data => {
                    if(data.length > 0) {
                        res.status(200).json(data)
                    } else {
                        res.status(404).json({message: "no todos found"})
                    }
                })

                .catch(err => {
                    res.status(500).json({ message: "Something went wrong" })
                })
        } else {
            res.status(400).json({ message: "No list ID supplied" })
        }
    }
}

module.exports = todoController;