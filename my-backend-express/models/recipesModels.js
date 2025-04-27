const pool = require('../config/db');

exports.getAllRecipes = async () => {
  const result = await pool.query('SELECT * FROM recipes');
  return result.rows;
};

exports.getMyRecipes = async (user_id) => {
  const result = await pool.query('SELECT * FROM recipes WHERE user_id = $1', [user_id]);
  return result.rows;
};

exports.findRecipeByName = async (user_id, name) => {
  const result = await pool.query(
    'SELECT * FROM recipes WHERE user_id = $1 AND name = $2',
    [user_id, name]
  );
  return result.rows[0];
};

exports.findRecipeById = async (id) => {
  const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return result.rows[0];
};

exports.createRecipe = async (user_id, name, ingredients, instructions) => {
  const result = await pool.query(
    `INSERT INTO recipes (user_id, name, ingredients, instructions)
     VALUES ($1, $2, $3, $4)
     RETURNING id, user_id, name, ingredients, instructions`,
    [user_id, name, ingredients, instructions]
  );
  return result.rows[0];
};

exports.updateRecipeById = async (id, { name, ingredients, instructions }) => {
  const result = await pool.query(
    `UPDATE recipes SET
      name = COALESCE($1, name),
      ingredients = COALESCE($2, ingredients),
      instructions = COALESCE($3, instructions)
     WHERE id = $4
     RETURNING *`,
    [name, ingredients, instructions, id]
  );
  return result.rows[0];
};

exports.deleteRecipeById = async (id) => {
  await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
};
