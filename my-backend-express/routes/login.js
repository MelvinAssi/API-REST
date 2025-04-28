const express = require('express');
const { body } = require('express-validator');
const loginController = require('../controllers/loginController');
const verifyRecaptcha = require('../middleware/verifyRecaptcha');

const router = express.Router();

router.post('/', verifyRecaptcha,
  [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
], loginController.loginUser);

module.exports = router;