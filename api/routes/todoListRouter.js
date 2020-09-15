const router = require('express').Router();
const todoListController = require('../controllers/todoListController');

router.get('/:listID', todoListController.getAllInList);
router.get('/:listID/:todoID', todoListController.get);
router.post('/', todoListController.post);
router.put('/:listID', todoListController.put);
router.delete('/:listID', todoListController.delete);

module.exports = router;