const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const loginModel = require('../models/loginModel');

    exports.loginUser =async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ error: errors.array()[0].msg });
        }
  
        const { email, password } = req.body;
        
        const user = await loginModel.findUserByEmail(email);
        if(!user){
            return res.status(400).json({ error: 'Email error' });
        }
        
        const isPasswordValid = await argon2.verify(user.password, password);
         if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
         }
  

  
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        const { password: passwordFromDb, ...userWithoutPassword } = user;

        res.json({ message: 'Connexion réussie', user: userWithoutPassword, token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
      }
    }
