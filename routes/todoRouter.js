const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getAll);
router.get('/:_id', todoController.get);
router.post('/', todoController.post);
router.put('/:_id', todoController.put);
router.delete('/:_id', todoController.delete);

module.exports = router;