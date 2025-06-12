// backend/routes/userRoutes.js

const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// ⚠️ Admin-only routes first (so '/' doesn’t get caught by '/:id')
router.get('/', protect, isAdmin, getAllUsers);

// Logged-in user routes
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.delete('/:id', protect, isAdmin, deleteUser); // This is usually admin-only

module.exports = router;
