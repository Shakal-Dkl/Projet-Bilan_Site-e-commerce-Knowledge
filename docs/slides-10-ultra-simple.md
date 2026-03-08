# Slides ultra simples (10 slides) - Knowledge Learning

> Version courte, claire, facile à tenir dans le temps.

---

## Slide 1 — Titre
### À afficher
- Knowledge Learning
- Projet e-learning / e-commerce
- Angular + Node.js + SQLite

### À dire
Je présente mon projet Knowledge Learning, une plateforme e-learning avec logique e-commerce.

---

## Slide 2 — Besoin
### À afficher
- Digitaliser la vente de formations
- Achat en ligne de cursus / leçons
- Accès aux contenus après achat

### À dire
L’objectif est de passer d’une offre papier à une offre web accessible à distance.

---

## Slide 3 — Fonctionnalités clés
### À afficher
- Inscription + activation mail
- Connexion
- Achat sandbox
- Validation des leçons
- Certifications

### À dire
J’ai implémenté toutes les fonctionnalités principales demandées dans le sujet.

---

## Slide 4 — Stack technique
### À afficher
- Front: Angular + Bootstrap + SCSS
- Back: Node.js / Express
- BDD: SQLite + Sequelize

### À dire
J’ai choisi une stack simple et adaptée à un projet de niveau débutant.

---

## Slide 5 — Architecture
### À afficher
- Controllers
- Services
- Repositories
- Models

### À dire
L’architecture 3-tiers MVC sépare bien les responsabilités et facilite la maintenance.

---

## Slide 6 — Base de données
### À afficher
- users, themes, curriculums, lessons
- purchases, lesson_progress, certifications
- champs de traçabilité inclus

### À dire
Le modèle répond aux besoins e-learning + e-commerce et respecte les exigences de la grille.

---

## Slide 7 — Sécurité
### À afficher
- JWT
- CSRF middleware
- bcrypt
- politique mot de passe
- rôles admin/client

### À dire
La sécurité couvre l’authentification, les permissions et la protection des requêtes.

---

## Slide 8 — Logique métier
### À afficher
- Achat = droit d’accès
- Validation leçon par bouton
- Certification auto si thème validé

### À dire
La règle la plus importante est l’automatisation de la progression et des certifications.

---

## Slide 9 — Tests
### À afficher
- tests auth
- tests achat
- tests repository + sécurité
- résultats passants

### À dire
Les tests couvrent les points évalués: inscription, connexion, achat et composants d’accès aux données.

---

## Slide 10 — Conclusion
### À afficher
- Objectifs atteints
- Prototype fonctionnel
- pistes: paiement réel, mail réel, CI/CD

### À dire
Le projet est conforme au cahier des charges et prêt pour une évolution vers une version production.

---

## Script démo ultra court (90 secondes)
1. Aller sur `/auth` et se connecter.
2. Aller sur `/catalog` et acheter une leçon.
3. Ouvrir la leçon et cliquer « Valider cette leçon ».
4. Aller sur `/certifications`.

## Phrase finale prête
Merci pour votre attention, je peux maintenant répondre à vos questions sur l’architecture, la sécurité ou la base de données.
