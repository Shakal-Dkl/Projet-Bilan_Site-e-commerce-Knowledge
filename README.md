# Projet Bilan - Knowledge Learning

Application e-learning/e-commerce réalisée avec:
- **Frontend**: Angular + Bootstrap + SCSS
- **Backend**: Node.js (Express, architecture MVC 3-tiers)
- **Base de données**: MongoDB via Mongoose

## Fonctionnalités livrées

- Inscription utilisateur
- Activation de compte par lien mail (prototype: lien affiché en console backend)
- Connexion JWT
- Rôles (`admin`, `client`, `other`)
- Achat sandbox de **cursus** et de **leçon**
- Accès à une leçon uniquement si achetée (ou cursus acheté)
- Validation d’une leçon
- Validation automatique du cursus quand toutes ses leçons sont validées
- Génération de certification quand toutes les leçons d’un thème sont validées
- Page certifications utilisateur
- Backoffice admin (liste utilisateurs + achats)
- Middleware CSRF actif côté backend (hors environnement test)
- Politique de mot de passe (min 8, majuscule/minuscule/chiffre)

## Structure

- [backend](backend)
  - `src/models`: modèle de données
  - `src/repositories`: composants d’accès aux données
  - `src/services`: logique métier
  - `src/controllers`: contrôleurs HTTP
  - `src/routes`: routes API
  - `tests`: tests unitaires
- [frontend](frontend)
  - `src/app/pages`: pages Angular
  - `src/app/core`: services API et auth

## Prérequis

- Node.js 20+
- npm 10+

## Installation et lancement

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run start
```

Sous PowerShell (Windows), utilisez:

```powershell
Copy-Item .env.example .env
```

API: `http://localhost:3000`

### 2) Frontend

```bash
cd frontend
npm install
npm start
```

App: `http://localhost:4200`

## Comptes de test

- **Admin** (créé par le seed)
  - Email: `admin@knowledge.local`
  - Mot de passe: `Admin1234`

- **Client**
  - Créer un compte via `/auth`
  - Activer le compte avec le lien affiché dans la console backend

## Tests

Dans `backend`:

```bash
npm test
```

Couvre:
- Inscription + activation + connexion
- Achat et validation d’une leçon
- Tests repository (fonctionnel + sécurité mot de passe hashé)

## Couleurs et style

Palette appliquée:
- `#f1f8fc`
- `#0074c7`
- `#00497c`
- `#384050`
- `#cd2c2e` (accent)
- `#82b864` (accent)

Police: **Comic Sans MS**

## Remarques importantes (prototype)

- Le paiement est simulé en mode **sandbox**.
- L’activation email fonctionne en mode prototype via lien de console.

## Déploiement gratuit (Render)

### 1) Préparer le dépôt

- Pousser le projet sur GitHub (repo public recommandé pour la correction).
- Vérifier que `backend` et `frontend` sont bien dans le repo.

### 2) Déployer le backend (Render Web Service)

Créer un service Render avec ces paramètres:

- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm run start`

Variables d’environnement à ajouter:

- `PORT=10000`
- `APP_BASE_URL=https://<ton-backend>.onrender.com`
- `FRONTEND_URL=https://<ton-frontend>.onrender.com`
- `JWT_SECRET=<une-valeur-longue-et-securisee>`
- `ENABLE_CSRF=true`

Puis lancer une première initialisation de données:

- Ouvrir le **Shell** Render du backend
- Exécuter: `npm run seed`

### 3) Déployer le frontend (Render Static Site)

Créer un site statique Render avec:

- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist/frontend/browser` (ou `dist/frontend` selon version Angular)

### 4) Mettre à jour les URLs frontend -> backend

Le frontend appelle actuellement l’API locale (`http://localhost:3000`).
Pour le déploiement, remplacer cette URL par l’URL Render backend dans:

- `frontend/src/app/core/api.service.ts`

Exemple:

- `https://<ton-backend>.onrender.com/api`

### 5) Vérification après déploiement

- Ouvrir le frontend Render
- Tester `/catalog` (visible sans connexion)
- Tester inscription + activation
- Tester connexion admin (`admin@knowledge.local` / `Admin1234`)
- Tester achat et accès leçons

### 6) Template copier-coller (à remplir)

Backend Render:

- **Service Name**: `knowledge-learning-api`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm run start`

Variables d’environnement backend:

```env
PORT=10000
APP_BASE_URL=https://knowledge-learning-api.onrender.com
FRONTEND_URL=https://knowledge-learning-front.onrender.com
JWT_SECRET=REMPLACE_PAR_UN_SECRET_LONG
ENABLE_CSRF=true
MONGODB_URI=mongodb://127.0.0.1:27017/knowledge_learning
```

Frontend Render (Static Site):

- **Service Name**: `knowledge-learning-front`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist/frontend/browser`

Après création des services:

1. Dans `frontend/src/app/core/api.service.ts`, remplacer:
  - `http://localhost:3000/api`
  par
  - `https://knowledge-learning-api.onrender.com/api`
2. Commit + push.
3. Relancer un déploiement frontend.
4. Ouvrir le shell backend Render et exécuter:

```bash
npm run seed
```
