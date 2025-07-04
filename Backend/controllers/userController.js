const User = require('../models/user');

// GET /api/users/:id - Get single user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id - Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// GET /api/users - Admin: get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// DELETE /api/users/:id - Admin: delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// PUT /api/users/change-password
const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { currentPassword, newPassword } = req.body;

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = newPassword; // This will get hashed in the pre-save hook
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// upload profile picture
const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profilePic = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: 'Profile picture uploaded', profilePic: user.profilePic });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// PUT /api/users/:id/role - Admin changes user role
const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ['customer', 'artisan', 'admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Role updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  changePassword, 
   uploadProfilePic, 
   changeUserRole,
};
