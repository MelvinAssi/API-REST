const { validationResult } = require('express-validator');
const recipesModel = require('../models/recipesModels');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur : ' + error.message });
  }
};

exports.getMyRecipes = async (req, res) => {
  try {
    const user_id = req.user.id;
    const recipes = await recipesModel.getMyRecipes(user_id);
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur : ' + error.message });
  }
};

exports.createRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  try {
    const user_id = req.user.id;
    const { name, ingredients, instructions } = req.body;

    const existing = await recipesModel.findRecipeByName(user_id, name);
    if (existing) return res.status(400).json({ error: 'Recipe with this name already exists' });

    const recipe = await recipesModel.createRecipe(user_id, name, ingredients, instructions);
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur : ' + error.message });
  }
};

exports.updateRecipeById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  try {
    const user_id = req.user.id;
    const recipe_id = parseInt(req.params.id);
    const { name, ingredients, instructions } = req.body;

    const recipe = await recipesModel.findRecipeById(recipe_id);
    if (!recipe || recipe.user_id !== user_id) {
      return res.status(403).json({ error: 'you can not update other recipe.' });
    }

    const updated = await recipesModel.updateRecipeById(recipe_id, {
      name,
      ingredients,
      instructions,
    });

    res.json({ message: 'Recipe update', recipe: updated });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur : ' + error.message });
  }
};

exports.deleteRecipeById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const recipe_id = parseInt(req.params.id);

    const recipe = await recipesModel.findRecipeById(recipe_id);
    if (!recipe || recipe.user_id !== user_id) {
      return res.status(403).json({ error: "You can not delete this recipe." });
    }

    await recipesModel.deleteRecipeById(recipe_id);
    res.json({ message: 'Recipe delete succes' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur : ' + error.message });
  }
};

exports.deleteRecipeByIdAdmin = async (req, res) => {
    try {
      const recipe_id = parseInt(req.params.id);
  
      await recipesModel.deleteRecipeById(recipe_id);
      res.json({ message: 'Recipe delete succes' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }
  };


  exports.updateRecipeByIdAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });
  
    try {
      const recipe_id = parseInt(req.params.id);
      const { name, ingredients, instructions } = req.body;
  
      const updated = await recipesModel.updateRecipeById(recipe_id, {
        name,
        ingredients,
        instructions,
      });
  
      res.json({ message: 'Recipe update', recipe: updated });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }
  };