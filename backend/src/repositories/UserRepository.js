const { User } = require('../models');

class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findByActivationToken(token) {
    return User.findOne({ where: { activationToken: token } });
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async listAll() {
    return User.findAll({ order: [['createdAt', 'DESC']] });
  }
}

module.exports = new UserRepository();
