# API REST pour Gestion des Utilisateurs
## Sommaire
 - [Présentation](#présentation) 
    - [Fonctionnalités](#fonctionnalités) 
    - [Technologies](#technologies) 
- [Démarrage](#démarrage) 
    - [Prérequis](#prérequis) 
    - [Installation](#installation) 
- [Structure du Projet](#structure-du-projet)
    
## Présentation

Ce projet est une API REST conçue pour gérer des utilisateurs avec des opérations CRUD (Create, Read, Update, Delete). Elle permet l'inscription, l'authentification et la gestion des données des utilisateurs. L'API est construite avec une architecture MVC (Modèle-Vue-Contrôleur) et met l'accent sur la sécurité (authentification JWT, hachage des mots de passe avec bcrypt). Une interface frontend en React.js est prévue pour interagir avec l'API, et le projet est conteneurisé avec Docker.

### Fonctionnalités
- Inscription des utilisateurs (POST /users).
- Authentification des utilisateurs avec JWT (POST /login).
- Gestion des utilisateurs :
  - Récupérer un utilisateur par ID (GET /user/{id}).
  - Lister tous les utilisateurs (GET /users).
  - Mettre à jour un utilisateur (PUT /user/{id}).
  - Supprimer un utilisateur (DELETE /user/{id}).
- Sécurité : hachage des mots de passe (bcrypt), authentification JWT pour les routes protégées.
- Base de données PostgreSQL pour le stockage des données.
- Environnement conteneurisé avec Docker.
- Tests de l'API avec Postman.
- Conception de la base de données avec la méthode Merise.

### Technologies
- **Backend** : Node.js, Express.js
- **Base de données** : PostgreSQL
- **Conteneurisation** : Docker, Docker Compose
- **Sécurité** : JWT, bcrypt
- **Tests** : Postman
- **Contrôle de version** : Git, GitHub
- **Méthodologie** : Merise pour la conception de la base de données

## Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- Docker et Docker Compose
- PostgreSQL (si vous n'utilisez pas Docker)
- Git
- Postman (pour tester l'API)

### Installation
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
## Structure du Projet
```text
my-backend-express/
├── config/           # Configuration de la base de données
├── controllers/      # Logique de l'API (MVC)
├── models/           # Modèles de la base de données (MVC)
├── routes/           # Routes de l'API (MVC)
├── middleware/       # Gestion de l'authentification et des erreurs
├── .env              # Variables d'environnement
├── .gitignore        # Fichiers ignorés par Git
├── Dockerfile        # Configuration Docker
├── docker-compose.yml # Configuration Docker Compose
├── package.json      # Dépendances Node.js
├── server.js         # Point d'entrée de l'API
└── README.md         # Documentation du projet
``` 
## Auteur

- **Melvin Assi** – [GitHub](https://github.com/MelvinAssi)