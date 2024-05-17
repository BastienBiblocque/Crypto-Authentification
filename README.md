# Application d'Authentification

L'application d'authentification est une plateforme sécurisée permettant aux utilisateurs de s'inscrire et de se connecter en toute confiance. Elle est développée avec Node.js et Express pour le backend, et utilise une simple page HTML pour le frontend.

## Fonctionnalités

- Inscription des utilisateurs avec validation des champs
- Connexion sécurisée avec gestion des sessions
- Hachage des mots de passe avec bcrypt pour une sécurité renforcée

## Technologies Utilisées

- Node.js
- Express
- bcrypt
- 
## Configuration

Créez un fichier `.env` à la racine du projet et définissez les variables d'environnement suivantes :

- PORT=3000
- JWT_SECRET=VOTRE_SECRET_JWT

## Utilisation

1. Lancez l'application : `node app.js ou nodemon app.js pour la version de dev`
2. Accédez à l'application dans votre navigateur : `http://localhost:3000`
