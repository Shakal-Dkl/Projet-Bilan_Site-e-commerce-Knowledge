const { body, validationResult } = require('express-validator');

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

const registerValidators = [
  body('email').isEmail().withMessage('Invalid email'),
  body('firstName').isLength({ min: 2 }).withMessage('First name too short'),
  body('lastName').isLength({ min: 2 }).withMessage('Last name too short'),
  body('password')
    .matches(passwordRule)
    .withMessage('Password must contain upper/lower case, number, length 8-64')
];

const loginValidators = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password required')
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

module.exports = { registerValidators, loginValidators, validate, passwordRule };
