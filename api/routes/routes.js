const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.get);
router.get('/:_id', todoController.get);
router.post('/', todoController.post);
router.put('/:_id', todoController.put);
router.delete('/:_id', todoController.delete);

module.exports = router;