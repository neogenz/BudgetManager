# BudgetManager
Cette application est destinée à rendre conviviale et simple la gestion de son porte feuille (virtuel ou non).

[Démo](http://budgetmanager.mdesogus.com)
## Techonolgies utilisées
### Backend
- Serveur 
	- NodeJS
- Base de données
	- MongoDB

### Frontend
- AngularJS
- HTML 5
- CSS 3

### Script runner
1. Grunt, utilisé pour :
    - Lancement de mongod
    - Validation jslint
    - Mignification (à venir)
    - Concaténation des JS (à venir)
    - Lancement de TU fonctionelle via Karma (à venir)
    - Lancement de test de GUI via Protractor (à venir)

#### Modules NodeJS utilisés
1. Serveur
	- Express
2. ORM
	- Mongoose
3. Log HTTP
	- Morgan
5. Authentification
	- JsonWebToken

#### Modules AngularJS utilisés
1. Routage
	- ui.router
2. Loader
	- angular-loading-bar
3. Modal
	- ui.boostrap
4. Fonctionnalités natives AngularJS
    - Composants (angular v1.5.x minimum)

#### Autres
- underscore.js
- fontawesome
- bootstrap

### Pattern utilisés
- Abstract Factory
- Revealing Module Pattern

### Structure du projet
- 01_Commons/ -> Scripts JS utilitaires pour la partie serveur
- 02_Webservices/ -> Provider de WS exposées
- 03_DataAcessLayer/ -> Provider d'accès au données (MongoDB)
- 04_Models/ -> Définition des beans métier & techniques
- config/ -> Configuration serveur (endpoints, login de base de données)
- node_modules/ -> Fichier contenant les sources des modules NodeJS
- public/ -> Répertoire contenant le code du front (client)
	- app/ -> Code contenant tous le code AngularJS (Controllers, components, views, factory, ...)
	- assets/ -> Répertoire contenant le code JS natif, librairies externes, etc ...
