const todoModel = require('../models/todoModel');
const utils = require('./controllerUtils');

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
        try {
            const todos = 
                await utils.sort({
                    req,
                    model: todoModel,
                    sortKey: 'title'
                })
            res.status(200).json(todos);       
            
        } catch(err) {
            console.error(err.message);
            res.status(500).json({message: "could not complete request"})
        }
    },
    
    create: async (req, res) => {
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
    update: async (req, res) => {
        let { title, done, duedate } = req.body;
        let { todoID } = req.params;
        let newTodo = {}; 

        if(todoID) {
            if (title) newTodo.title = title;
            if (typeof done !== 'undefined') newTodo.done = done;
            if (duedate) newTodo.duedate = new Date(duedate);
    
            todoModel.update(todoID, newTodo)
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
        let { todoID } = req.params;

        if(todoID) {    
            todoModel.delete(todoID)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(500).json({message: "could not delete todo"})
                })
        } else {
            res.status(400).json({ message: "no ID supplied" })
        }
    },

    addTodoToList: (req, res) => {
        const { listID } = req.params;
        const createdByID = req.user._id;
        let { title, duedate } = req.body;


        if(listID && createdByID) {
            if(typeof duedate === 'undefined') duedate = false;

            todoModel.create({ listID, createdByID, title, duedate })
                .then(data => {
                    res.status(200).json(data)
                })

                .catch(err => {
                    res.status(500).json({ message: "Something went wrong" })
                })
        } else {
            res.status(400).json({ message: "No list ID supplied" })
        }        
    },

    getTodosInList: (req, res) => {
        const { listID } = req.params;

        if(listID) {
            utils.sort({ req, model: todoModel, sortKey: 'title', filter: { listID } })
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