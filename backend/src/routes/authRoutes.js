const express = require('express');
const authController = require('../controllers/AuthController');
const { registerValidators, loginValidators, validate } = require('../validators/authValidators');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerValidators, validate, (req, res) => authController.register(req, res));
router.get('/activate/:token', (req, res) => authController.activate(req, res));
router.post('/login', loginValidators, validate, (req, res) => authController.login(req, res));
router.get('/me', requireAuth, (req, res) => authController.me(req, res));

module.exports = router;
