const express = require('express');
const authRoutes = require('./authRoutes');
const catalogRoutes = require('./catalogRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const learningRoutes = require('./learningRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/', catalogRoutes);
router.use('/', purchaseRoutes);
router.use('/', learningRoutes);
router.use('/', adminRoutes);

module.exports = router;
