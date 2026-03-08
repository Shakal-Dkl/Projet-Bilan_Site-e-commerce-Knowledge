const express = require('express');
const adminController = require('../controllers/AdminController');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin/users', requireAuth, requireRole('admin'), (req, res) => adminController.listUsers(req, res));
router.get('/admin/purchases', requireAuth, requireRole('admin'), (req, res) =>
  adminController.listPurchases(req, res)
);

module.exports = router;
