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
                data ?
                    res.status(200).json(data)
                :
                    res.status(404).json({message: "no todos found"})
                
            })
            .catch(err => {
                res.status(500).json({message: "could not get todos"})
            })  
    },

    getAllAccessibleTodoLists: async (req, res) => {
        const { _id } = req.user;

        todoListModel.getAllAccessibleTodoLists(_id)
            .then(data => {
                data ?
                    res.status(200).json(data)
                :
                    res.status(404).json({message: "no todos lists found"})
                
            })
            .catch(err => {
                res.status(500).json({message: "could not get todos lists"})
            })          
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

    update: async (req, res) => {     
        let { title, sharedWith } = req.body;
        let { listID } = req.params;
        let newTodoList = {}; 

        if(listID) {
            if (title) newTodoList.title = title;
            if (sharedWith) newTodoList.sharedWith = sharedWith;
    
            todoListModel.update(listID, newTodoList)
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
        let { listID } = req.params;

        if(listID) {
            todoModel.deleteAllInList(listID)
                .then(() => {
                    todoListModel.delete(listID)
                        .then(data => {
                            res.status(200).json(data);
                        })
                        .catch(err => {
                            res.status(500).json({message: "could not delete todo list"})
                        })
                })
                .catch(err => {
                    res.status(500).json({message: "could not delete todos in todo list"})
                })

        } else {
            res.status(400).json({ message: "no ID supplied" })
        }
    }
}

module.exports = todoController;