const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');
const userRepository = require('../repositories/UserRepository');
const { sendActivationEmail } = require('../utils/mailer');

class AuthService {
  async register({ email, password, firstName, lastName }) {
    // EN: Avoid duplicate accounts by unique email.
    // FR: Empêche les doublons de compte grâce à l'email unique.
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already used');
    }

    // EN: Activation token is required before first login.
    // FR: Un token d'activation est requis avant la première connexion.
    const activationToken = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      email,
      passwordHash,
      firstName,
      lastName,
      role: 'client',
      activationToken,
      isActive: false,
      createdBy: email,
      updatedBy: email
    });

    // EN: In prototype mode this link is printed in backend console.
    // FR: En mode prototype ce lien est affiché dans la console backend.
    const activationLink = `${env.APP_BASE_URL}/api/auth/activate/${activationToken}`;
    await sendActivationEmail({ to: email, activationLink });
    return { user, activationLink };
  }

  async activate(token) {
    // EN: Activates account from one-time token.
    // FR: Active le compte à partir d'un token à usage unique.
    const user = await userRepository.findByActivationToken(token);
    if (!user) {
      throw new Error('Invalid activation token');
    }

    user.isActive = true;
    user.activationToken = null;
    user.updatedBy = user.email;
    await user.save();
    return user;
  }

  async login({ email, password }) {
    // EN: Login checks both password validity and account activation.
    // FR: La connexion vérifie à la fois le mot de passe et l'activation du compte.
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account not activated');
    }

    // EN: JWT carries user id + role for route authorization.
    // FR: Le JWT transporte id + rôle pour l'autorisation des routes.
    const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.JWT_SECRET, {
      expiresIn: '12h'
    });

    return { token, user };
  }
}

module.exports = new AuthService();
