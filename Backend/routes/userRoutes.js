// backend/routes/userRoutes.js
const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');
const { registerUser } = require('../controllers/authController'); // ✅ add this
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Add register route
router.post('/register', registerUser);

// ⚠️ Admin-only routes
router.get('/', protect, isAdmin, getAllUsers);

// Logged-in user routes
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
