const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const usersModel = require('../models/usersModel');


exports.registerUser = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        const {username,email,password}=req.body


        if(await usersModel.findUserByEmail(email)){
            return res.status(400).json({ error: 'Email already in use' });
        }
        if(await usersModel.findUserByUsername(username)){
            return res.status(400).json({ error: 'Username already in use' });
        }

        const hash = await argon2.hash(password);
        const newUser = await usersModel.creatUser(username,email,hash);

        const token = jwt.sign(
                {
                id: newUser.id,
                username,
                email,
                is_admin: newUser.is_admin,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
        );

        
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,          
          sameSite: 'None',      
          maxAge: 60 * 60 * 1000,
        });
        res.status(201).json({
            message: "Connexion succes" ,
            user: {
              id: newUser.id,
              email: newUser.email,
              username: newUser.username,
              is_admin: newUser.is_admin,
              created_at: newUser.created_at
            }
          
        });

    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Erreur serveur' });
    }
}

exports.getAllUsers = async(req,res) =>{
    try {
    
        const users = await usersModel.getAllUsers();
    
        const safeUsers = users.map(({ password, ...user }) => user);
    
        res.json({ users: safeUsers });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur: " + error.message });
      }
}