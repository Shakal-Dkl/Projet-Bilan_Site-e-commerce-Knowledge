const express = require('express');
const purchaseController = require('../controllers/PurchaseController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/purchase/curriculums/:curriculumId', requireAuth, requireRole('client', 'admin'), (req, res) =>
  purchaseController.purchaseCurriculum(req, res)
);
router.post('/purchase/lessons/:lessonId', requireAuth, requireRole('client', 'admin'), (req, res) =>
  purchaseController.purchaseLesson(req, res)
);

module.exports = router;
