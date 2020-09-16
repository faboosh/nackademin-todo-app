const jwt = require('jsonwebtoken');

module.exports = {
    canAccessList: (req, res, next) => {
        next();
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