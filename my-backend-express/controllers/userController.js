const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');

exports.fetchUserData = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const idFromToken = req.user.id; 
        if (idFromToken !== id) {
            return res.status(403).json({ message: 'You are not allowed to fetch the other user data' });
        }
        const user = await userModel.findUserByID(id)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password , ...userWithoutPassword } = user;
        res.json({
            message: 'Profil found with succes',
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
}


exports.deleteUser = async(req,res) =>{
    try{
        const id = parseInt(req.params.id, 10);
        const idFromToken = req.user.id; 
        if (idFromToken !== id) {
            return res.status(403).json({ message: 'You are not allowed to delete the other user ' });
        }
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
    const id = parseInt(req.params.id, 10);
    const idFromToken = req.user.id; 
    if (idFromToken !== id) {
        return res.status(403).json({ message: 'You are not allowed to modify the other user ' });
    }

    const { email, username, password, newpassword } = req.body;
    try{
        
        const user = await userModel.findUserByID(id);
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
        }
        const hashedPassword = null;
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
            user: updatedUser
          });

    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
    

 }