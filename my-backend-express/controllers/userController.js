const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');

exports.fetchUserData = async (req, res) => {
    try{
        const id = req.user.id;
        const user = await userModel.findUserByID(id)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Profil found with succes',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                is_admin: user.is_admin,
                created_at: user.created_at
              }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
}


exports.deleteUser = async(req,res) =>{
    try{
        const id = req.user.id; 
        await userModel.deleteUserByID(id);
        res.json({
            message: 'Account delete with succes',
        });
    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
}
 exports.updateUserData = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    const id = req.user.id; 

    const { email, username, password, newpassword } = req.body;
    try{
        
        const user = await userModel.findUserByID(id);
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
        }
        let hashedPassword = null;
        if(newpassword){
            hashedPassword = await argon2.hash(newpassword);
        }
        const updatedUser = await userModel.updateUserByID(
            id,
            email === "" ? null : email,
            username === "" ? null : username,
            hashedPassword
        );

        res.json({
            message: 'User updated successfully',
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                is_admin: updatedUser.is_admin,
                created_at: updatedUser.created_at
              }
          });

    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
    

 }