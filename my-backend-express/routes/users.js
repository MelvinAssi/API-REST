const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth')
const verifyRecaptcha = require('../middleware/verifyRecaptcha');
const isAdminMiddleware = require('../middleware/isAdmin')

const router = express.Router();

router.post('/', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
], verifyRecaptcha,usersController.registerUser);
router.get('/',authMiddleware,isAdminMiddleware,usersController.getAllUsers,)

module.exports = router;



