const authService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      return res.status(201).json({
        message: 'Account created. Check email to activate.',
        userId: user.id
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async activate(req, res) {
    try {
      await authService.activate(req.params.token);
      return res.status(200).json({ message: 'Account activated' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token, user } = await authService.login(req.body);
      return res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  me(req, res) {
    return res.status(200).json({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      isActive: req.user.isActive
    });
  }
}

module.exports = new AuthController();
