const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const indexController = require('../controllers/indexController');

router.get('/', forwardAuthenticated, indexController.root);
router.get('/dashboard', ensureAuthenticated, indexController.dashboard);

module.exports = router;
