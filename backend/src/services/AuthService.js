const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');
const userRepository = require('../repositories/UserRepository');
const { sendActivationEmail } = require('../utils/mailer');

class AuthService {
  async register({ email, password, firstName, lastName }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already used');
    }

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

    const activationLink = `${env.APP_BASE_URL}/api/auth/activate/${activationToken}`;
    await sendActivationEmail({ to: email, activationLink });
    return user;
  }

  async activate(token) {
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

    const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.JWT_SECRET, {
      expiresIn: '12h'
    });

    return { token, user };
  }
}

module.exports = new AuthService();
