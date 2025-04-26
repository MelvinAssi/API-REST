const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json()); 
app.use(cookieParser());


const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const userRoutes = require('./routes/user');
const adminRoutes =require('./routes/admin');


app.use(cors({
    origin: ['https://localhost:5173'],
    credentials: true,
}));


app.use('/users', usersRoutes);
app.use('/login',loginRoutes);
app.use('/logout',logoutRoutes);
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);










const keyPath = path.join(__dirname, 'certs', 'localhost-key.pem');
const certPath = path.join(__dirname, 'certs', 'localhost.pem');
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');
const credentials = { key: privateKey, cert: certificate };


const PORT = 3000;
https.createServer(credentials, app).listen(PORT, () => {
console.log(`✅ Serveur HTTPS démarré sur https://localhost:${PORT}`);
});


  app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Express sécurisée !');
  });