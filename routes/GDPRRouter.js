const router = require('express').Router();
const GDPRController = require('../controllers/GDPRController');

router.get('/', GDPRController.getUserData);

module.exports = router;