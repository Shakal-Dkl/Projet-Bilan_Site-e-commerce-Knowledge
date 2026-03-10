const { body, validationResult } = require('express-validator');

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

const registerValidators = [
  body('email').isEmail().withMessage('Email invalide'),
  body('firstName').isLength({ min: 2 }).withMessage('Le prénom doit contenir au moins 2 caractères'),
  body('lastName').isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
  body('password')
    .matches(passwordRule)
    .withMessage('Le mot de passe doit contenir une majuscule, une minuscule, un chiffre (8 à 64 caractères)')
];

const loginValidators = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis')
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

module.exports = { registerValidators, loginValidators, validate, passwordRule };
