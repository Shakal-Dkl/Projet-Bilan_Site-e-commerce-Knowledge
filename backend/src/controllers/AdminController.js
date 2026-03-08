const userRepository = require('../repositories/UserRepository');
const purchaseRepository = require('../repositories/PurchaseRepository');

class AdminController {
  async listUsers(req, res) {
    const users = await userRepository.listAll();
    return res.status(200).json(users);
  }

  async listPurchases(req, res) {
    const purchases = await purchaseRepository.listAll();
    return res.status(200).json(purchases);
  }
}

module.exports = new AdminController();
