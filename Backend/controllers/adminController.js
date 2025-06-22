const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalArtisans = await User.countDocuments({ role: 'artisan' });
    const totalProducts = await Product.countDocuments();
    const pendingProducts = await Product.countDocuments({ isApproved: false });
    const totalOrders = await Order.countDocuments();

    const totalEarningsAgg = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, totalEarnings: { $sum: '$totalPrice' } } }
    ]);

    const totalEarnings = totalEarningsAgg[0]?.totalEarnings || 0;

    res.status(200).json({
      totalUsers,
      totalArtisans,
      totalProducts,
      pendingProducts,
      totalOrders,
      totalEarnings
    });
  } catch (error) {
    console.error('Dashboard Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

module.exports = {
  adminDashboard,
};
