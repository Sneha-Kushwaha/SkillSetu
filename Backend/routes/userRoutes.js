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

// Logged-in user routes
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);

// Admin-only routes
router.get('/', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
