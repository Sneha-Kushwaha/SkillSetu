const express = require('express');
const router = express.Router();
const { adminDashboard } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Admin Dashboard Analytics
router.get('/dashboard', protect, isAdmin, adminDashboard);

module.exports = router;
