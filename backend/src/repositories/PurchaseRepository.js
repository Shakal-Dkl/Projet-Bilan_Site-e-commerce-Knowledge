const { Purchase } = require('../models');

class PurchaseRepository {
  async create(data) {
    return Purchase.create(data);
  }

  async hasCurriculumAccess(userId, curriculumId) {
    const purchase = await Purchase.findOne({ userId, curriculumId, paymentStatus: 'paid' });
    return Boolean(purchase);
  }

  async hasLessonAccess(userId, lessonId) {
    const purchase = await Purchase.findOne({ userId, lessonId, paymentStatus: 'paid' });
    return Boolean(purchase);
  }

  async listByUser(userId) {
    return Purchase.find({ userId }).sort({ createdAt: -1 });
  }

  async listAll() {
    return Purchase.find({ paymentStatus: { $ne: null } }).sort({ createdAt: -1 });
  }
}

module.exports = new PurchaseRepository();
