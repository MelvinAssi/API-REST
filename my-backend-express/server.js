const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csrfMiddleware = require('./middleware/csrfMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json()); 
app.use(cookieParser());


const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const userRoutes = require('./routes/user');
const adminRoutes =require('./routes/admin');
const recipesRoutes = require('./routes/recipes')



app.use(cors({
    origin: ['https://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use(helmet());
app.use(helmet.hsts({
  maxAge: 63072000,
  includeSubDomains: true,
  preload: true
}));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self';" + 
    "script-src 'self' https://www.google.com;" +
    "style-src 'self';" +
    "img-src 'self' data:;" +
    "font-src 'self';" +
    "connect-src 'self' https://www.google.com https://localhost:5173;" +
    "form-action 'self';" +
    "frame-ancestors 'none';" +
    "upgrade-insecure-requests;");
  next();
});
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});

app.use(limiter)


app.use('/users', usersRoutes);
app.use('/login',loginRoutes);
app.use('/logout',logoutRoutes);
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/recipes',recipesRoutes);










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