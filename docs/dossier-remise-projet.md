# Dossier de remise — Knowledge Learning

## Informations générales
- **Projet** : Knowledge Learning
- **Type** : Plateforme e-learning avec logique e-commerce
- **Stack** : Angular, Bootstrap, SCSS, Node.js, Express, MongoDB, Mongoose
- **Architecture** : MVC 3-tiers (controllers, services, repositories, models)

---

## Sommaire
- [1) Présentation du projet](#1-présentation-du-projet)
  - [1.1 Résumé exécutif](#11-résumé-exécutif)
  - [1.2 Problématique](#12-problématique)
  - [1.3 Solution proposée](#13-solution-proposée)
  - [1.4 Valeur apportée](#14-valeur-apportée)
  - [1.5 Limites actuelles](#15-limites-actuelles)
  - [1.6 Évolutions possibles](#16-évolutions-possibles)
- [2) Documentation du projet](#2-documentation-du-projet)
  - [2.1 Objectif](#21-objectif)
  - [2.2 Architecture du dépôt](#22-architecture-du-dépôt)
  - [2.3 Modèle de données (résumé)](#23-modèle-de-données-résumé)
  - [2.4 Règles métier clés](#24-règles-métier-clés)
  - [2.5 Sécurité](#25-sécurité)
  - [2.6 Installation et exécution (local)](#26-installation-et-exécution-local)
  - [2.7 Tests](#27-tests)
  - [2.8 Déploiement (Render)](#28-déploiement-render)
- [3) Annexes (optionnel pour la remise)](#3-annexes-optionnel-pour-la-remise)
  - [3.1 Compte de test admin](#31-compte-de-test-admin)
  - [3.2 Parcours de vérification rapide](#32-parcours-de-vérification-rapide)
- [4) Conclusion de remise](#4-conclusion-de-remise)

---

## 1) Présentation du projet

### 1.1 Résumé exécutif
Knowledge Learning est une application web e-learning/e-commerce. Elle permet d’acheter des contenus de formation, de suivre la progression et d’obtenir des certifications.

### 1.2 Problématique
Le besoin est de transformer une offre de formation classique en service numérique, avec gestion des utilisateurs, des achats, des accès et de la progression.

### 1.3 Solution proposée
- Frontend : SPA Angular
- Backend : API Express en MVC 3-tiers
- Données : MongoDB via Mongoose
- Sécurité : JWT, bcrypt, CSRF, rôles

### 1.4 Valeur apportée
- Parcours complet : inscription → activation → achat → apprentissage
- Contrôle d’accès conforme aux achats
- Architecture claire et maintenable
- Base solide pour une évolution production

### 1.5 Limites actuelles
- Paiement en mode sandbox
- Activation email en mode prototype
- Frontend volontairement minimaliste

### 1.6 Évolutions possibles
- Provider email réel
- Provider paiement réel
- Tests frontend automatisés
- CI/CD complète
- Monitoring applicatif

---

## 2) Documentation du projet

### 2.1 Objectif
Fournir une plateforme e-learning/e-commerce permettant l’achat de contenus pédagogiques et le suivi de progression avec certification.

### 2.2 Architecture du dépôt
- `backend/` : API Node.js/Express
  - `src/models` : schémas Mongoose
  - `src/repositories` : accès aux données
  - `src/services` : logique métier
  - `src/controllers` : endpoints
  - `src/routes` : routes API
  - `tests` : tests backend
- `frontend/` : application Angular
  - `src/app/pages` : pages principales
  - `src/app/core` : services API/Auth
- `docs/` : supports de soutenance et documentation

### 2.3 Modèle de données (résumé)
Entités principales :
- `User`
- `Theme`
- `Curriculum`
- `Lesson`
- `Purchase`
- `LessonProgress`
- `Certification`

Champs transverses de traçabilité :
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`

### 2.4 Règles métier clés
- Un compte non activé ne peut pas se connecter.
- Un utilisateur accède à une leçon uniquement s’il a acheté la leçon ou son cursus.
- La validation des leçons alimente la progression.
- La certification est générée quand toutes les leçons d’un thème sont validées.

### 2.5 Sécurité
- JWT pour l’authentification API
- bcrypt pour le hash des mots de passe
- CSRF activé côté backend en environnement non-test
- Contrôles de rôles pour les routes admin

### 2.6 Installation et exécution (local)
#### Backend
1. Aller dans `backend`
2. Installer les dépendances : `npm install`
3. Créer le fichier `.env` depuis `.env.example`
4. Initialiser les données : `npm run seed`
5. Lancer le serveur : `npm run start`

#### Frontend
1. Aller dans `frontend`
2. Installer les dépendances : `npm install`
3. Lancer l’application : `npm start`

### 2.7 Tests
Dans `backend` :
- `npm test`

Couverture actuelle :
- Authentification (inscription/activation/connexion)
- Achat + validation d’une leçon
- Repository + sécurité du mot de passe hashé

### 2.8 Déploiement (Render)
- Backend : service web Node.js
- Frontend : static site
- Variables critiques backend :
  - `APP_BASE_URL` = URL backend
  - `FRONTEND_URL` = URL frontend
  - `JWT_SECRET`
  - `ENABLE_CSRF=true`
  - `MONGODB_URI`

---

## 3) Annexes (optionnel pour la remise)

### 3.1 Compte de test admin
- Email : `admin@knowledge.local`
- Mot de passe : `Admin1234`

### 3.2 Parcours de vérification rapide
1. Ouvrir `/catalog`
2. Créer un compte sur `/auth`
3. Activer le compte
4. Se connecter
5. Acheter une leçon
6. Valider la leçon
7. Vérifier `/certifications`

---

## 4) Conclusion de remise
Ce dossier montre que le projet Knowledge Learning est fonctionnel, structuré et sécurisé, avec une logique métier complète alignée sur le cahier des charges. Il constitue une base solide pour une montée en production progressive.
