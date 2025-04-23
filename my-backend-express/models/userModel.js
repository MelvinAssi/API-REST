const pool = require("../config/db");



exports.findUserByID = async(id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0]
}
exports.deleteUserByID = async(id) => {
    await pool.query('DELETE  FROM users WHERE id = $1', [id]);
}

exports.updateUserByID = async(id, email, username, password) =>{
    const result = await pool.query(
        ` UPDATE users SET
         email = COALESCE($1, email) , username = COALESCE($2, username) , password = COALESCE($3, password) 
        WHERE id = $4
    RETURNING id, email, username, is_admin, created_at;
    `,
    [email, username, password, id]
  );
    return result.rows[0];
}