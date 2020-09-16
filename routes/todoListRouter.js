const router = require('express').Router();
const todoListController = require('../controllers/todoListController');
const auth = require('../middlewares/auth');

//router.get('/', todoListController.getListsForUser);
router.get('/:listID', todoListController.get);
//router.get('/:listID/todos', todoListController.getTodosInList);

router.post('/', todoListController.create);
//router.post('/:listID/', todoListController.getList);

module.exports = router;