const express = require('express');
const learningController = require('../controllers/LearningController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/lessons/:lessonId/validate', requireAuth, requireRole('client', 'admin'), (req, res) =>
  learningController.validateLesson(req, res)
);
router.get('/certifications', requireAuth, requireRole('client', 'admin'), (req, res) =>
  learningController.listCertifications(req, res)
);

module.exports = router;
