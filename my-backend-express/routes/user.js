const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth')

const router = express.Router();
router.get('/', authMiddleware, userController.fetchUserData);
router.put('/',authMiddleware,    
    [
      body('newemail').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
      body('newusername').optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
      body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
      body('newpassword').optional({ checkFalsy: true }).isLength({ min: 12 }).withMessage('New password must be at least 12 characters'),
    ],
    userController.updateUserData
  );
  
router.delete('/',
    authMiddleware,
    [
      body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
    ],
    userController.deleteUser
  );
module.exports = router;