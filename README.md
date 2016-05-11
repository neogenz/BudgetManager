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
```
budgetmanager
|-- 01_Commons/                     - Scripts JS utilitaires pour la partie serveur
|-- 02_Werbservices/                - Provider de WS exposées
|-- 03_DataAcessLayer/              - Provider d'accès au données (Mongoose)
|-- 04_Models/                      - Définition des beans métier & techniques
|-- config/                         - Configuration serveur (endpoints, login de base de données)
|-- node_modules/                   - Sources et dépendances des modules NodeJS
|-- public/                         - Code du front (client)
|   |-- app/                        - Code AngularJS (Controllers, components, views, factory, ...)
|   |   |-- components/             - Répertoires classés par module métier/technique
|   |   |   `-- authentication/     - Module technique gérant l'authentification du client
|   |   |       |-- controllers/    - Définition des contrôleurs, pas obligatoire si peu de contrôleurs
|   |   |       `-- views/          - Définition des vues, pas obligatoire si peu de vues
|   |   |-- shared/                 - Pareil que components/ mais pour les composant partageable au sein des projets
|   |   |-- app.js                  - Définition de l'application AngularJS
|   |   `-- routing.js              - Définition des routes de l'application
|   `-- assets/                     - Tout JS non Angular, code vanillaJS, css, images, configurations, etc ...
|       |-- css/                    - CSS commun du projet
|       |-- img/                    - Images du projet
|       |-- js/                     - Code vanillaJS : libraire interne (écrites par sois-même), librairies externes, etc ...
|       |   |-- commons/            - Librairies utilitaires interne vanillaJS, utilisé un peu partout au sein du front
|       |   |-- config/             - Script de configuration (environement, endpoint, etc ...)
|       |   |-- model/              - Bean métiers, adapté depuis le back pour les besoins du front
|       |   `-- bootstrap.js        - Fichier d'initialisation des namespaces JS racines utilisé au sein de notre code
|       `-- libs/                   - Librairies externes (embarquant chacune sa structure spécifique, css, etc ...)
|-- Gruntfile.js                    - Fichier d'automatisation de tâche Grunt
|-- server.js                       - Définition du serveur Express
|-- routing.js                      - Définition des routes de base (pour servir les fichiers & pour l'authentification)
|-- .jslintrc                       - Validation JSLint
`-- .eslintrc                       - Validation ESLint
```
