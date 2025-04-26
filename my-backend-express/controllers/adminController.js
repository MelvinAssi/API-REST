const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const adminModel = require('../models/adminModel');


exports.registerUser= async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
     try{
         const {username,email,is_admin}=req.body
 
        let password ='AzertyAzerty25';
         if(await adminModel.findUserByEmail(email)){
             return res.status(400).json({ error: 'Email already in use' });
         }
         if(await adminModel.findUserByUsername(username)){
             return res.status(400).json({ error: 'Username already in use' });
         }
 
         const hash = await argon2.hash(password);
         const newUser = await adminModel.createUser(username,email,hash,is_admin);
 
         
         res.status(201).json({
             message: "Create succes" ,
             user: {
               id: newUser.id,
               email: newUser.email,
               username: newUser.username,
               is_admin: newUser.is_admin,
               created_at: newUser.created_at
             }
           
         });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur: " + error.message });
      }
}
exports.updateUserData= async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    try{
        const { id ,newemail, newusername, adminpassword, is_admin } = req.body;
        const adminid = req.user.id; 

        const admin = await adminModel.findUserByID(adminid);
        const isPasswordValid = await argon2.verify(admin.password, adminpassword);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
        }

        const updatedUser = await adminModel.updateUserByID(
            id,
            newemail === "" ? null : newemail,
            newusername === "" ? null : newusername,
            is_admin
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
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur: " + error.message });
      }
}
exports.deleteUser= async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    try{
        const { adminpassword,id} = req.body;
        console.log(adminpassword,id)
        const adminid = req.user.id; 

        const admin = await adminModel.findUserByID(adminid);
        const isPasswordValid = await argon2.verify(admin.password, adminpassword);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Password error' });
        }


        await adminModel.deleteUserByID(id);
        res.json({
            message: 'Account delete with succes',
        });
    }catch (error){
        res.status(500).json({ message: 'Erreur serveur ='+error });
    }
}

exports.getAllUsers = async(req,res) =>{
    try {    
        const users = await adminModel.getAllUsers();
    
        const safeUsers = users.map(({ password, ...user }) => user);
    
        res.json({ users: safeUsers });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur: " + error.message });
      }
}