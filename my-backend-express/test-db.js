
const pool = require('./config/db');


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur de connexion :', err.stack);
    } else {
        console.log('Connexion réussie, heure actuelle :', res.rows[0]);
    }
    pool.end();
});