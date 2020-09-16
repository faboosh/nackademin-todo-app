const todoModel = require('../models/todoModel');

const todoController = {
    get: async (req, res) => {
        const { _id } = req.params;

        todoModel.get(_id)
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

    getAll: async (req, res) => {
        todoModel.getAll()
            .then(data => {
                if(data.length > 0) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({message: "no todos found"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "could not get todos"})
            })  
    },
    
    post: async (req, res) => {
        let { title, duedate } = req.body;

        if(title) {
            if(typeof duedate === 'undefined') duedate = false;

            todoModel.create({title, duedate })
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json(err)
                })      
        } else {
            res.status(400).json({message: "invalid todo formatting"})
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
    
            todoModel.update(_id, newTodo)
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
            todoModel.delete(_id)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(500).json({message: "could not delete todo"})
                })
        } else {
            res.status(400).json({ message: "no ID supplied" })
        }
    }
}

module.exports = todoController;