const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth')
const isAdminMiddleware = require('../middleware/isAdmin')

const router = express.Router();

router.post('/',authMiddleware,isAdminMiddleware,
    [    
        body('adminpassword').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('email').isEmail().withMessage('Invalid email'),
        body('is_admin').isBoolean().withMessage('is_admin must be true or false'),
    ],
   adminController.registerUser
);

router.put('/',authMiddleware,isAdminMiddleware,    
    [        
        body('adminpassword').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
        body('newemail').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
        body('newusername').optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('is_admin').isBoolean().withMessage('is_admin must be true or false'),
    ],
    adminController.updateUserData
);
  
router.delete('/',authMiddleware,isAdminMiddleware,
    [
        body('adminpassword').isLength({ min: 12 }).withMessage('Password must be at least 12 characters'),
    ],
    adminController.deleteUser
);

router.get('/',authMiddleware,isAdminMiddleware,adminController.getAllUsers);


module.exports = router;