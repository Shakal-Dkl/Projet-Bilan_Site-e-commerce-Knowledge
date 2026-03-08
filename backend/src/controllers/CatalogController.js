const catalogService = require('../services/CatalogService');
const purchaseService = require('../services/PurchaseService');

class CatalogController {
  async listCatalog(req, res) {
    const catalog = await catalogService.getCatalog();
    return res.status(200).json(catalog);
  }

  async getCurriculum(req, res) {
    try {
      const curriculum = await catalogService.getCurriculum(Number(req.params.id));
      return res.status(200).json(curriculum);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  async getLesson(req, res) {
    try {
      const lesson = await catalogService.getLesson(Number(req.params.id));

      if (!req.user) {
        return res.status(403).json({ message: 'Login required for lesson access' });
      }

      const canAccess = await purchaseService.canAccessLesson(req.user.id, lesson);
      if (!canAccess) {
        return res.status(403).json({ message: 'Please buy this lesson or its curriculum first' });
      }

      return res.status(200).json(lesson);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new CatalogController();
