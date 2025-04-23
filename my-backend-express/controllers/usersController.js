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
        res.status(201).json({ user: newUser, token });

    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Erreur serveur' });
    }
}