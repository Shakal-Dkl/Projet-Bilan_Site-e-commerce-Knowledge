const express = require('express');
const catalogController = require('../controllers/CatalogController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/catalog', (req, res) => catalogController.listCatalog(req, res));
router.get('/curriculums/:id', (req, res) => catalogController.getCurriculum(req, res));
router.get('/lessons/:id', requireAuth, (req, res) => catalogController.getLesson(req, res));

module.exports = router;
