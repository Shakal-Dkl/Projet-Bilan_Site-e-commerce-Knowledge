# Script oral minute par minute - Knowledge Learning

## Version 10 minutes

### Minute 0 à 1 — Introduction
Bonjour, je vais vous présenter mon projet Knowledge Learning. C’est une plateforme e-learning avec une partie e-commerce. Le but est de permettre à un utilisateur de créer un compte, acheter des leçons ou des cursus, puis progresser jusqu’à obtenir des certifications.

### Minute 1 à 2 — Contexte et besoin
Le contexte est celui d’une entreprise qui vendait déjà des contenus de formation et qui veut proposer une offre digitale. Le besoin principal est d’avoir une application fonctionnelle et sécurisée, avec gestion des rôles et simulation d’achat.

### Minute 2 à 3 — Fonctionnalités principales
Les fonctionnalités livrées sont: inscription, activation de compte par email, connexion, achat de leçon ou de cursus, accès conditionné à l’achat, validation des leçons et affichage des certifications obtenues.

### Minute 3 à 4 — Stack technique
Pour le frontend j’ai utilisé Angular avec Bootstrap et SCSS. Pour le backend: Node.js avec Express. Pour la base de données: SQLite avec Sequelize. Le projet est organisé en architecture MVC 3-tiers.

### Minute 4 à 5 — Architecture du code
Les contrôleurs gèrent les requêtes HTTP. Les services portent la logique métier. Les repositories isolent l’accès aux données. Cette séparation rend le code plus clair et plus maintenable.

### Minute 5 à 6 — Base de données
Le modèle contient les tables users, themes, curriculums, lessons, purchases, lesson_progress et certifications. J’ai ajouté les champs de traçabilité demandés: created_at, updated_at, created_by, updated_by.

### Minute 6 à 7 — Sécurité
Les mots de passe sont hashés avec bcrypt. L’authentification se fait avec JWT. Le contrôle d’accès se fait par rôle admin/client. J’ai aussi ajouté une protection CSRF côté backend et une politique de validation du mot de passe.

### Minute 7 à 8 — Logique métier e-learning
Une leçon peut être validée par un bouton. Quand toutes les leçons d’un cursus sont validées, le cursus est considéré validé. Quand toutes les leçons d’un thème sont validées, une certification est générée.

### Minute 8 à 9 — Tests
J’ai ajouté des tests unitaires sur l’inscription, l’activation, la connexion, l’achat et les composants d’accès aux données. Les tests passent et valident les comportements critiques.

### Minute 9 à 10 — Conclusion
En conclusion, le projet répond au cahier des charges. Les améliorations possibles seraient d’intégrer un vrai service email, un vrai paiement en production et une pipeline CI/CD.

---

## Version 15 minutes

### Minute 0 à 2 — Introduction + objectifs
Bonjour, je vais présenter Knowledge Learning, une plateforme e-learning/e-commerce. Mon objectif était de respecter le cahier des charges avec un backend solide et un frontend minimaliste mais fonctionnel.

### Minute 2 à 4 — Besoin métier
L’entreprise veut digitaliser son offre de formation. Le site doit gérer des utilisateurs, des contenus pédagogiques, des achats, des droits d’accès et des certifications.

### Minute 4 à 6 — Démo fonctionnelle rapide
1) Création de compte 2) activation 3) connexion 4) achat leçon 5) accès à la leçon 6) validation 7) affichage des certifications.

### Minute 6 à 8 — Architecture
J’ai appliqué une architecture 3-tiers de type MVC:
- Controllers: endpoints REST
- Services: règles métier
- Repositories: requêtes base
- Models: schéma de données

### Minute 8 à 10 — Modèle de données
Le MPD relie thèmes, cursus, leçons et achats. Les relations permettent de contrôler l’accès au contenu et de suivre la progression. Le modèle inclut les rôles et les traces de création/mise à jour.

### Minute 10 à 12 — Sécurité
J’ai sécurisé l’authentification avec JWT, hashé les mots de passe avec bcrypt, ajouté CSRF middleware et des validations de format mot de passe. Les routes admin sont protégées par rôle.

### Minute 12 à 13 — Tests
Les tests couvrent les exigences de la grille: auth, achat et composants data. Cela permet de vérifier les points critiques avant démonstration.

### Minute 13 à 14 — Limites
Le paiement est sandbox, l’email d’activation est en mode prototype (lien console), et le frontend reste volontairement simple.

### Minute 14 à 15 — Conclusion
Le prototype est conforme et évolutif. Prochaines étapes: provider email réel, paiement réel, déploiement cloud et tests frontend.

---

## Version 30 minutes

### Minute 0 à 3 — Introduction complète
Bonjour, je vais présenter mon projet Knowledge Learning. Le but est de créer une plateforme de formation en ligne avec une logique e-commerce. J’ai suivi le cahier des charges, avec un focus sur le backend, la sécurité, la structuration du code et les tests.

### Minute 3 à 6 — Présentation du besoin
L’entreprise fictive vend des formations et souhaite passer au numérique. Le périmètre comprend: création de compte, activation, connexion, achats, accès conditionné aux leçons, validation pédagogique et certification.

### Minute 6 à 10 — Parcours utilisateur détaillé
Je montre le parcours complet:
- un utilisateur s’inscrit
- il active son compte
- il se connecte
- il achète une leçon ou un cursus
- il accède au contenu acheté
- il valide sa progression
- il consulte ses certifications

### Minute 10 à 14 — Choix technologiques
Frontend Angular + Bootstrap + SCSS pour une interface simple.
Backend Node.js + Express pour l’API.
Sequelize + SQLite pour la persistance.
Ces choix me permettent une implémentation lisible, rapide et cohérente avec un projet pédagogique.

### Minute 14 à 18 — Architecture logicielle
Structure en couches:
- controllers pour les routes et la réponse HTTP
- services pour la logique métier
- repositories pour l’accès aux tables
- models pour les entités
Cette structure répond à la demande d’organisation propre du code.

### Minute 18 à 22 — Modèle de données et règles métier
Tables principales: users, themes, curriculums, lessons, purchases, lesson_progress, certifications.
Règles:
- achat de cursus = accès aux leçons du cursus
- achat de leçon = accès à la leçon
- validation de toutes les leçons d’un thème = certification
Traçabilité ajoutée avec created_at/updated_at et created_by/updated_by.

### Minute 22 à 25 — Sécurité
- Password hashé en base (bcrypt)
- JWT pour session API
- contrôle des routes par rôle
- middleware CSRF
- validation stricte des entrées
L’objectif est de réduire les risques courants sur ce type d’application.

### Minute 25 à 27 — Tests
J’ai implémenté des tests unitaires et d’intégration backend:
- inscription/activation/connexion
- achat et validation
- repositories et sécurité du stockage des mots de passe
Les suites passent et démontrent la robustesse du socle.

### Minute 27 à 29 — Limites et améliorations
Limites actuelles: paiement et email en mode prototype.
Améliorations possibles: service SMTP réel, provider de paiement réel, CI/CD, monitoring et tests frontend automatisés.

### Minute 29 à 30 — Conclusion et ouverture
Le projet respecte les exigences fonctionnelles et techniques. Je suis prêt à détailler les choix d’architecture, la sécurité ou les décisions base de données selon vos questions.

---

## Questions probables du jury + réponses courtes

### Pourquoi avoir choisi SQLite ?
Pour un prototype local simple à déployer et à évaluer rapidement.

### Pourquoi MVC 3-tiers ?
Pour séparer clairement les responsabilités et faciliter la maintenance.

### Où est la sécurité concrètement ?
JWT, bcrypt, CSRF, validation des entrées, contrôle par rôle.

### Comment prouver les tests ?
Exécution des suites backend avec résultats passants.

### Que feriez-vous en production ?
PostgreSQL/MySQL, provider paiement réel, SMTP réel, CI/CD, logs et monitoring.
