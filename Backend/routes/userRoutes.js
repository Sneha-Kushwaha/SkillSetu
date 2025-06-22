
const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  uploadProfilePic,
} = require('../controllers/userController');
const { registerUser } = require('../controllers/authController'); 
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { changePassword } = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware');
const { changeUserRole } = require('../controllers/userController');

const router = express.Router();

//  Add register route
router.post('/register', registerUser);

//  Admin-only routes
router.put('/:id/role', protect, isAdmin, changeUserRole);
router.get('/', protect, isAdmin, getAllUsers);

// Logged-in user routes
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.delete('/:id', protect, isAdmin, deleteUser);
router.put('/change-password', protect, changePassword);

// Upload profile picture
router.post('/upload-profile-pic', protect, upload.single('profile'), uploadProfilePic);

module.exports = router;
