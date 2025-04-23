const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const app = express();
app.use(express.json()); 


const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login')
const userRoutes = require('./routes/user')


app.use('/users', usersRoutes);
app.use('/login',loginRoutes)
app.use('/user',userRoutes)









const keyPath = path.join(__dirname, 'certs', 'localhost-key.pem');
const certPath = path.join(__dirname, 'certs', 'localhost.pem');
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');
const credentials = { key: privateKey, cert: certificate };


const PORT = 3001;
https.createServer(credentials, app).listen(PORT, () => {
console.log(`✅ Serveur HTTPS démarré sur https://localhost:${PORT}`);
});


  app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Express sécurisée !');
  });