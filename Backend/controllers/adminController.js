const User = require('../models/User');
const Product = require('../models/Product');

// Approve artisan registration
const approveArtisan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'artisan') return res.status(404).json({ message: 'Artisan not found' });

    user.isApproved = true;
    await user.save();
    res.json({ message: 'Artisan approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving artisan' });
  }
};

// Approve product
const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.isApproved = true;
    await product.save();
    res.json({ message: 'Product approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving product' });
  }
};

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const artisans = await User.countDocuments({ role: 'artisan' });
    res.json({ users, products, artisans });
  } catch (err) {
    res.status(500).json({ message: 'Dashboard error' });
  }
};

module.exports = { approveArtisan, approveProduct, getDashboardStats };
