const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');
const verifyRecaptcha = require('../middleware/verifyRecaptcha');

const router = express.Router();

router.post('/', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
], verifyRecaptcha,usersController.registerUser);

module.exports = router;



