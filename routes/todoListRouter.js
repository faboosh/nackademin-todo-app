const router = require('express').Router();
const todoListController = require('../controllers/todoListController');
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth');

router.get('/', todoListController.getAllAccessibleTodoLists);
router.get('/:listID', auth.canAccessList, todoListController.getByID);
router.get('/:listID/todos', auth.canAccessList, todoController.getTodosInList);

router.post('/', todoListController.create);
router.post('/:listID/todos', todoController.addTodoToList);

router.patch('/:listID', auth.canAccessList, todoListController.update);
router.patch('/:listID/todos/:todoID', auth.canAccessList, todoController.update);

router.delete('/:listID', auth.wasCreatedByUser, todoListController.delete);
router.delete('/:listID/todos/:todoID', auth.wasCreatedByUser, todoController.delete);

module.exports = router;