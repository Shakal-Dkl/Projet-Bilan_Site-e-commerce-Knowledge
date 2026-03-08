# Fiche antisèche (1 page) — Oral Knowledge Learning

## 1) Pitch d’ouverture (20 secondes)
Je présente **Knowledge Learning**, une plateforme e-learning/e-commerce. Le projet permet l’inscription, l’activation de compte, l’achat de leçons/cursus, l’accès sécurisé aux contenus et la génération de certifications.

## 2) Stack technique (à dire en 15 secondes)
- Frontend: Angular + Bootstrap + SCSS
- Backend: Node.js + Express
- Base de données: SQLite + Sequelize
- Auth/Sécurité: JWT, bcrypt, CSRF

## 3) Fonctionnalités clés (à citer vite)
- Créer un compte
- Activer le compte par mail (lien prototype)
- Se connecter
- Acheter une leçon ou un cursus (sandbox)
- Accéder uniquement aux leçons achetées
- Valider une leçon
- Obtenir des certifications
- Backoffice admin (utilisateurs + achats)

## 4) Architecture (phrase prête)
Architecture **MVC 3-tiers** :
- Controllers = HTTP
- Services = logique métier
- Repositories = accès aux données
- Models = schéma de base

## 5) Base de données (ce que le jury veut entendre)
Tables principales: `users`, `themes`, `curriculums`, `lessons`, `purchases`, `lesson_progress`, `certifications`.
Chaque table inclut: `created_at`, `updated_at`, `created_by`, `updated_by`.

## 6) Sécurité (mots-clés)
- Mot de passe hashé (bcrypt)
- JWT pour sessions API
- Middleware CSRF
- Validation mot de passe (taille + complexité)
- Contrôle d’accès par rôle (`admin`, `client`, `other`)

## 7) Démo express (90 secondes)
1. `/auth` : connexion
2. `/catalog` : achat d’une leçon
3. `/lessons/:id` : ouvrir + valider la leçon
4. `/certifications` : afficher les certifications

## 8) Tests (à ne pas oublier)
- Auth: inscription / activation / connexion
- Achat + validation
- Repositories + test sécurité mot de passe hashé

## 9) Difficultés rencontrées (formulation simple)
- Gestion CSRF avec SPA Angular
- Vérification fine des droits d’accès métier
- Structuration propre des couches backend

## 10) Améliorations futures (2-3 idées max)
- SMTP réel
- Paiement réel
- CI/CD + déploiement cloud

## 11) Conclusion (phrase de fin)
Le projet répond au cahier des charges avec un backend structuré, sécurisé et testé, et un frontend volontairement minimaliste mais fonctionnel.

## 12) Questions pièges + réponses très courtes
**Pourquoi SQLite ?**
Prototype local simple et rapide.

**Pourquoi MVC ?**
Séparation claire des responsabilités.

**Que manque-t-il pour la prod ?**
Paiement réel, email réel, observabilité, CI/CD.
