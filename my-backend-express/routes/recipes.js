const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const isAdminMiddleware = require('../middleware/isAdmin');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

// 🧾 Lecture publique
router.get('/', recipesController.getAllRecipes);

// 👤 Routes utilisateurs connectés
router.get('/me', authMiddleware, recipesController.getMyRecipes);

router.post(
  '/me',
  authMiddleware,
  [
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('ingredients').notEmpty().withMessage('Ingredients must not be empty'),
    body('instructions').notEmpty().withMessage('Instructions must not be empty'),
  ],
  recipesController.createRecipe
);

router.put(
  '/me/:id',
  authMiddleware,
  [
    body('name').optional().isLength({ min: 2 }),
    body('ingredients').optional().notEmpty(),
    body('instructions').optional().notEmpty(),
  ],
  recipesController.updateRecipeById
);

router.delete('/me/:id', authMiddleware, recipesController.deleteRecipeById);



router.delete('/admin/:id', authMiddleware,isAdminMiddleware,recipesController.deleteRecipeByIdAdmin );
router.put('/admin/:id', authMiddleware,isAdminMiddleware,
    [
        body('name').optional().isLength({ min: 2 }),
        body('ingredients').optional().notEmpty(),
        body('instructions').optional().notEmpty(),
      ],
      recipesController.updateRecipeByIdAdmin
 );



module.exports = router;