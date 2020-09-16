const router = require('express').Router();
const userController = require('../controllers/userController');

// router.get('/', userController.getAll);
// router.get('/:_id', userController.get);
// router.post('/', userController.post);
// router.put('/:_id', userController.put);
// router.delete('/:_id', userController.delete);
router.post('/register', userController.register);


module.exports = router;