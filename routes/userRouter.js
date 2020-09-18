const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', userController.getAll);
// router.get('/:_id', userController.get);
// router.post('/', userController.post);
// router.put('/:_id', userController.put);
router.delete('/', auth.verifyToken, userController.delete);
router.delete('/:_id', auth.verifyToken, auth.isAdmin, userController.delete);
router.post('/', userController.register);


module.exports = router;