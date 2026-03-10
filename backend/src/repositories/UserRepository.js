const { User } = require('../models');

class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByActivationToken(token) {
    return User.findOne({ activationToken: token });
  }

  async findById(id) {
    return User.findById(id);
  }

  async listAll() {
    return User.find().sort({ createdAt: -1 });
  }
}

module.exports = new UserRepository();
