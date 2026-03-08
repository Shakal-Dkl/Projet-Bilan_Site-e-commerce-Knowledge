# Slides prêtes à copier - Soutenance Knowledge Learning

> Format: **Contenu diapo** (court) + **Notes orales** (ce que tu dis)

---

## Slide 1 — Titre
### Contenu diapo
- Knowledge Learning
- Projet e-learning / e-commerce
- Angular + Node.js + SQLite
- Nom / Date

### Notes orales
Bonjour, je vais vous présenter mon projet de plateforme e-learning **Knowledge Learning**. L’objectif est de proposer une application web avec une logique e-commerce, des accès sécurisés aux contenus et un système de certification.

---

## Slide 2 — Contexte métier
### Contenu diapo
- Société fictive: éditeur de formations
- Vente historique: livres / kits
- Nouveau besoin: plateforme en ligne

### Notes orales
L’entreprise vendait surtout des supports papier. Le besoin était de digitaliser l’offre pour permettre aux clients d’acheter des cursus ou des leçons et d’étudier en autonomie.

---

## Slide 3 — Objectifs fonctionnels
### Contenu diapo
- Inscription + activation mail
- Connexion
- Achat cursus / leçon (sandbox)
- Accès aux leçons achetées
- Validation leçons + certifications

### Notes orales
J’ai implémenté toutes les fonctionnalités principales demandées dans le sujet, notamment l’activation de compte, les achats simulés et la validation pédagogique.

---

## Slide 4 — Choix techniques
### Contenu diapo
- Frontend: Angular + Bootstrap + SCSS
- Backend: Node.js / Express
- DB: SQLite + Sequelize ORM
- API REST + JWT

### Notes orales
J’ai choisi une stack simple, adaptée à un niveau débutant, mais structurée pour rester maintenable et répondre aux critères de notation.

---

## Slide 5 — Architecture 3-tiers MVC
### Contenu diapo
- Controllers: entrées HTTP
- Services: logique métier
- Repositories: accès données
- Models: structure BDD

### Notes orales
L’application suit une architecture 3-tiers de type MVC. Les contrôleurs ne contiennent pas de logique complexe, celle-ci est dans les services, et l’accès à la base est isolé dans les repositories.

---

## Slide 6 — Modèle physique de données
### Contenu diapo
- Entités: users, themes, curriculums, lessons
- Entités métier: purchases, lesson_progress, certifications
- Traçabilité: created_at, updated_at, created_by, updated_by

### Notes orales
Le modèle couvre les besoins e-learning et e-commerce. J’ai aussi ajouté les champs de traçabilité demandés dans la grille d’évaluation.

---

## Slide 7 — Rôles et sécurité
### Contenu diapo
- Rôles: admin / client / other
- JWT (authentification)
- Middleware CSRF
- Hash bcrypt + politique mot de passe

### Notes orales
Les mots de passe sont hashés en base, la connexion se fait par JWT, les routes sensibles sont protégées et j’ai ajouté une politique de mot de passe conforme au sujet.

---

## Slide 8 — Parcours utilisateur
### Contenu diapo
1. Créer un compte
2. Activer par mail
3. Se connecter
4. Acheter une leçon/cursus
5. Consommer la leçon
6. Valider la leçon

### Notes orales
Un utilisateur non activé ne peut pas acheter. Dès qu’il achète, il obtient les droits d’accès aux contenus concernés.

---

## Slide 9 — E-commerce sandbox
### Contenu diapo
- Achat simulé (provider sandbox)
- Transactions stockées (purchases)
- Vérification d’accès avant affichage leçon

### Notes orales
Le paiement est simulé pour rester dans le périmètre prototype, mais tout le cycle achat est réel côté logique applicative.

---

## Slide 10 — Certifications
### Contenu diapo
- Validation par bouton sur chaque leçon
- Cursus validé automatiquement
- Certification générée si thème complet validé
- Page “Mes certifications”

### Notes orales
C’est une règle métier clé: quand toutes les leçons d’un thème sont validées, l’application génère automatiquement la certification correspondante.

---

## Slide 11 — Backoffice admin
### Contenu diapo
- Liste utilisateurs
- Liste achats
- Contrôle d’accès par rôle admin

### Notes orales
Le backoffice est volontairement minimaliste mais fonctionnel, car le sujet demandait surtout la qualité backend et la sécurité.

---

## Slide 12 — Tests unitaires
### Contenu diapo
- Test inscription / activation / connexion
- Test achat + validation leçon
- Test repository + sécurité mot de passe
- Résultat: tests passants

### Notes orales
Les tests couvrent les points explicitement demandés dans la grille d’évaluation, notamment l’authentification, l’achat et les composants d’accès aux données.

---

## Slide 13 — Difficultés & solutions
### Contenu diapo
- CSRF avec frontend SPA
- Gestion des droits d’accès métier
- Structuration MVC propre

### Notes orales
Les principaux défis ont été la sécurité CSRF côté API et la logique d’autorisation d’accès aux leçons après achat.

---

## Slide 14 — Conclusion & perspectives
### Contenu diapo
- Objectifs du sujet atteints
- Code documenté et structuré
- Évolutions possibles: SMTP réel, paiement réel, CI/CD, tests frontend

### Notes orales
En conclusion, le prototype répond au cahier des charges. Les prochaines étapes seraient l’industrialisation: déploiement, pipeline CI/CD et tests frontend plus avancés.

---

## Mini script de démo (2-3 min)
1. Ouvrir `/auth`, créer un compte
2. Montrer lien d’activation dans console backend
3. Se connecter
4. Aller sur `/catalog`, acheter une leçon
5. Ouvrir la leçon et cliquer “Valider cette leçon”
6. Aller sur `/certifications`

## Phrase de fin (prête)
Merci pour votre attention. Je suis disponible pour détailler l’architecture, les choix de sécurité ou le modèle de données.
