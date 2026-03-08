const { Op } = require('sequelize');
const { Purchase } = require('../models');

class PurchaseRepository {
  async create(data) {
    return Purchase.create(data);
  }

  async hasCurriculumAccess(userId, curriculumId) {
    const purchase = await Purchase.findOne({ where: { userId, curriculumId, paymentStatus: 'paid' } });
    return Boolean(purchase);
  }

  async hasLessonAccess(userId, lessonId) {
    const purchase = await Purchase.findOne({ where: { userId, lessonId, paymentStatus: 'paid' } });
    return Boolean(purchase);
  }

  async listByUser(userId) {
    return Purchase.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  async listAll() {
    return Purchase.findAll({ where: { paymentStatus: { [Op.not]: null } }, order: [['createdAt', 'DESC']] });
  }
}

module.exports = new PurchaseRepository();
