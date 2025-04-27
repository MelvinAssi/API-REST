# API REST pour Gestion des Utilisateurs & Recettes

## Sommaire
- [Présentation](#présentation) 
  - [Fonctionnalités](#fonctionnalités) 
  - [Technologies](#technologies) 
- [Démarrage](#démarrage) 
  - [Prérequis](#prérequis) 
  - [Installation Backend](#installation-backend) 
  - [Installation Frontend](#installation-frontend)
- [Structure du Projet](#structure-du-projet)
- [Auteur](#auteur)

---

## 📌 Présentation

Ce projet est une API REST conçue pour gérer des utilisateurs et leurs recettes de cuisine.  
Elle inclut une interface frontend en React (Vite) pour interagir avec l’API.  
L’API suit une architecture MVC avec authentification JWT et hachage des mots de passe.  
Le projet est conteneurisé avec Docker.

---

### ✅ Fonctionnalités

#### 👤 Utilisateurs (`/user`)
- Connexion JWT : `POST /login`
- Lire ses infos : `GET /user`
- Modifier ses infos : `PUT /user`
- Supprimer son compte : `DELETE /user`

#### 🍽️ Recettes (`/recipes`)
- Créer une recette : `POST /recipes/me`
- Lire **toutes** les recettes : `GET /recipes`
- Lire ses propres recettes : `GET /recipes/me`
- Modifier une de ses recettes : `PUT /recipes/me/:id`
- Supprimer une de ses recettes : `DELETE /recipes/me/:id`

#### 🔐 Admin - Gestion des utilisateurs (`/admin`)
- Lister tous les utilisateurs : `GET /admin`
- Créer un utilisateur : `POST /admin`
- Modifier un utilisateur : `PUT /admin`
- Supprimer un utilisateur : `DELETE /admin`

#### 🛠️ Admin - Gestion des recettes (`/recipes/admin`)
- Supprimer une recette (par ID) : `DELETE /recipes/admin/:id`
- Modifier une recette (par ID) : `PUT /recipes/admin/:id`

---

### 🛠️ Technologies

- **Backend** : Node.js, Express.js  
- **Base de données** : PostgreSQL  
- **Frontend** : React.js + Vite  
- **Conteneurisation** : Docker, Docker Compose  
- **Sécurité** : JWT, bcrypt  
- **Tests** : Postman  
- **Contrôle de version** : Git, GitHub

---

## 🚀 Démarrage

### 🔧 Prérequis
- Node.js (v18+)
- Docker + Docker Compose
- PostgreSQL (si sans Docker)
- Git
- Postman

---

### ⚙️ Installation Backend
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/MelvinAssi/API-REST.git
   cd API-REST/my-backend-express
   ```  
2. Installer les dépendances :   
    ```bash
    npm install
    ``` 
3. Créer un fichier .env à la racine du projet et ajouter les variables suivantes (remplacez par vos valeurs) :   
    ```bash
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=api_users_db
    DB_PASSWORD=votre-mot-de-passe
    DB_PORT=5432
    PORT=5000
    JWT_SECRET=votre-secret-jwt
    NODE_ENV=development
    ``` 
4. (Optionnel) Lancer le projet avec Docker :
    ```bash
    docker-compose up --build 
    ``` 
5. (Sans Docker) Configurer la base de données PostgreSQL et créer la base api_users_db :
    ```sql
    CREATE DATABASE api_users_db;
    ``` 
6. Lancer le serveur :
    ```bash
    npm start
    ``` 

### 🌐 Installation Frontend
1. Aller dans le dossier frontend :

```bash
cd ../my-frontend-vite
```
2. Installer les dépendances :

```bash
npm install
```
3. Créer le fichier .env :

```env
VITE_API_URL=http://localhost:5000
```
4. Lancer l’application :

```bash
npm run dev
```


## Structure du Projet
```text
code/
├── merise/                # Conception MCD / MLD (à part)
├── my-backend-express/    # API REST Node.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── server.js
├── my-frontend-vite/      # Frontend React avec Vite
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.cjs
│   └── Dockerfile
├── docker-compose.yml
└── init.sql

``` 
## Auteur

- **Melvin Assi** – [GitHub](https://github.com/MelvinAssi)