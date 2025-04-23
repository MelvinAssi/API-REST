const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth')

const router = express.Router();
router.get('/:id', authMiddleware, userController.fetchUserData);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.put('/:id',authMiddleware, userController.updateUserData,
    [
        body('email').optional().isEmail().withMessage('Invalid email'),
        body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
        body('newpassword').optional().isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
    ]
)
module.exports = router;