const express = require('express');
const router = express.Router();
const { approveArtisan, approveProduct, getDashboardStats } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.put('/approve-user/:id', protect, isAdmin, approveArtisan);
router.put('/approve-product/:id', protect, isAdmin, approveProduct);
router.get('/dashboard', protect, isAdmin, getDashboardStats);

module.exports = router;
