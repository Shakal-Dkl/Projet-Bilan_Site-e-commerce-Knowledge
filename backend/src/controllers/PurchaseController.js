const purchaseService = require('../services/PurchaseService');

class PurchaseController {
  async purchaseCurriculum(req, res) {
    try {
      const purchase = await purchaseService.purchaseCurriculum(req.user, req.params.curriculumId);
      return res.status(201).json(purchase);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async purchaseLesson(req, res) {
    try {
      const purchase = await purchaseService.purchaseLesson(req.user, req.params.lessonId);
      return res.status(201).json(purchase);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new PurchaseController();
