const pool = require('../config/db');

exports.findUserByEmail = async (email) => {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    return result.rows[0];
};
exports.findUserByID = async(id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0]
}
exports.findUserByUsername =async(username)=>{
    const result = await pool.query('SELECT id FROM users WHERE username =$1',[username]);
    return result.rows[0];
};
exports.createUser = async (username, email, hash, is_admin) => {
    const result = await pool.query(`INSERT INTO users (username, email, password,is_admin) VALUES ($1, $2, $3, $4) RETURNING id,username, email,is_admin`,
        [username,email,hash,is_admin]
    );
    return result.rows[0];
};

exports.deleteUserByID = async(id) => {
    await pool.query('DELETE  FROM users WHERE id = $1', [id]);
}

exports.updateUserByID = async(id, email, username, is_admin) =>{
    const result = await pool.query(
        ` UPDATE users SET
         email = COALESCE($1, email) , username = COALESCE($2, username) , is_admin = $3 
        WHERE id = $4
    RETURNING id, email, username, is_admin, created_at;
    `,
    [email, username, is_admin, id]
  );
    return result.rows[0];
}

exports.getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};