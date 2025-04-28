const csrf = require('csrf');

// Créer une instance de la bibliothèque CSRF
const csrfProtection = csrf();

const csrfMiddleware = (req, res, next) => {
  // Si la méthode de la requête est GET, génère un token CSRF
  if (req.method === 'GET') {
    const token = csrfProtection.create(process.env.CSRF_SECRET);  // Utilise la clé secrète ou un identifiant unique
    res.json({ csrfToken: token }); // Renvoie le token au frontend
    return;
  }

  // Vérification du token pour les requêtes POST, PUT, DELETE
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const csrfToken = req.body.csrfToken || req.headers['csrf-token'];

    if (!csrfToken || !csrfProtection.verify(process.env.CSRF_SECRET, csrfToken)) {
      return res.status(403).json({ error: 'CSRF token invalid or missing' });
    }
  }

  next(); // Passe à la suite de la chaîne de middleware
};

module.exports = csrfMiddleware;
