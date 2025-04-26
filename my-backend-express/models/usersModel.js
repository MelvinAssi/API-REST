const pool = require('../config/db');


exports.findUserByEmail = async (email) => {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

exports.findUserByUsername =async(username)=>{
    const result = await pool.query('SELECT id FROM users WHERE username =$1',[username]);
    return result.rows[0];
};
exports.creatUser = async(username,email,hash) => {
    const result = await pool.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id,username, email,is_admin`,
        [username,email,hash]
    );
    return result.rows[0];
};



