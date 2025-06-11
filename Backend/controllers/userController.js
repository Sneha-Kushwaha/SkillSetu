// backend/controllers/userController.js

import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc   Get user profile by ID
// @route  GET /api/users/:id
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching user', error: err.message });
  }
};

// @desc   Update user profile (name, email, password)
// @route  PUT /api/users/:id
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update name/email only if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // If password is provided, hash it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });

  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

// @desc   Get all users (admin only)
// @route  GET /api/users
// @access Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// @desc   Delete user by ID (admin only)
// @route  DELETE /api/users/:id
// @access Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found or already deleted' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
