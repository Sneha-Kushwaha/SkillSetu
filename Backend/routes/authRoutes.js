const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/user');
const { requestPasswordReset, resetPassword } = require('../controllers/authController');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Test: Reset user
router.post('/reset-test-user', async (req, res) => {
  try {
    await User.deleteOne({ email: 'sneha@example.com' });

    const user = new User({
      name: 'Sneha',
      email: 'sneha@example.com',
      password: 'sneha123', // This will be hashed automatically by schema
      role: 'customer'
    });

    await user.save();
    res.status(201).json({ message: 'Test user created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
