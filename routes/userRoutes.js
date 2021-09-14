const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { forwardAuthenticated } = require('../config/auth');

router
  .route('/login')
  .post(authController.login)
  .get(authController.getLoginForm);

router
  .route('/register')
  .post(authController.register)
  .get(authController.getRegisterForm);

router.get('/logout', authController.logout);

module.exports = router;
