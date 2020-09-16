const jwt = require('jsonwebtoken');
const todoListModel = require('../models/todoListModel');

module.exports = {
    canAccessList: async (req, res, next) => {
        const queryObj = {
            userID: req.user._id, 
            listID: req.params.listID
        };

        if(req.user.role === 'admin' || await todoListModel.isAccessibleByUser(queryObj)) {
            next();
        } else {
            res.status(403).json({ message: "Not authorized to access todo list" })
        } 

    },
    verifyToken: (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader.substr(authorizationHeader.lastIndexOf(' ')+1);
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user;
            
            next();
        } catch(err) {
            res.status(403).json({ message: "Not signed in" })
        }
    }
}