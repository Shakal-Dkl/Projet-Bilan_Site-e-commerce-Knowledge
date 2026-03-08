# Plan de soutenance (30 minutes) - Knowledge Learning

## Slide 1 - Titre (1 min)
- Projet: Knowledge Learning (plateforme e-learning/e-commerce)
- Nom, formation, date
- Stack: Angular + Bootstrap/SCSS + Node.js + SQLite

## Slide 2 - Contexte & besoin métier (2 min)
- Entreprise fictive: éditeur de contenus de formation
- Besoin: digitaliser la vente en ligne de cursus et leçons
- Objectif: achat, accès sécurisé aux contenus, certifications

## Slide 3 - Cahier des charges fonctionnel (2 min)
- Inscription + activation mail
- Connexion
- Rôles: client/admin
- Achat leçon ou cursus (sandbox)
- Validation des leçons et certificats

## Slide 4 - Choix d’architecture (2 min)
- Architecture 3-tiers MVC
- Frontend (Angular)
- Backend API (Express)
- Data layer (Sequelize + SQLite)
- Pourquoi ce choix: simplicité, maintenabilité, lisibilité débutant

## Slide 5 - Modèle physique de données (4 min)
- Présenter le MPD: [mpd-knowledge-learning.mmd](mpd-knowledge-learning.mmd)
- Entités: users, themes, curriculums, lessons, purchases, lesson_progress, certifications
- Cardinalités clés
- Champs de traçabilité: created_at, updated_at, created_by, updated_by

## Slide 6 - Mise en place BDD (2 min)
- ORM Sequelize
- Synchronisation tables
- Seed des données de la version bêta
- Compte admin initial

## Slide 7 - Composants d’accès aux données (3 min)
- Pattern Repository: UserRepository, CatalogRepository, PurchaseRepository, ProgressRepository
- Avantage: séparation logique métier / accès SQL
- Exemples de méthodes critiques

## Slide 8 - Logique métier & e-commerce (4 min)
- Services: AuthService, PurchaseService, ProgressService
- Simulation paiement sandbox
- Règles d’accès aux leçons (achat requis)
- Auto-validation cursus + émission certification

## Slide 9 - Sécurité (3 min)
- JWT pour authentification
- Middleware CSRF
- Validation des mots de passe (regex)
- Hashage bcrypt des mots de passe
- Contrôle d’accès par rôle

## Slide 10 - Frontend minimaliste (2 min)
- Pages: auth, catalogue, leçon, certifications, admin
- Intégration Bootstrap + SCSS
- Respect de la palette et police demandées

## Slide 11 - Tests unitaires (3 min)
- Tests auth (inscription/activation/connexion)
- Test achat + validation leçon
- Test repository + sécurité mot de passe hashé
- Résultat: suites green

## Slide 12 - Démo guidée (2 min)
- Créer compte
- Activer compte
- Acheter leçon
- Ouvrir page leçon
- Valider leçon
- Afficher certifications

## Slide 13 - Difficultés & recherches (1 min)
- Mise en place CSRF avec frontend SPA
- Gestion des droits d’accès métier
- Structuration MVC/repositories

## Slide 14 - Conclusion & perspectives (1 min)
- Bilan des objectifs atteints
- Améliorations possibles: vrai provider mail, vrai provider paiement, CI/CD, tests frontend

---

## Conseils de passage oral
- Montrer d’abord le besoin métier, puis la preuve technique
- Rester concret avec 1 capture d’écran par fonctionnalité clé
- Pour chaque exigence du sujet, pointer la partie correspondante du code
