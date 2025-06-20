// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  placeOrder,
  getUserOrders,
  getSingleOrder,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');
const { isAdmin } = require('../middleware/authMiddleware'); 

// Customer: Place an order
router.post('/', protect, placeOrder);

// Customer: Get their own orders
router.get('/my-orders', protect, getUserOrders);

// Customer: View a single order by ID
router.get('/:orderId', protect, getSingleOrder);

// Admin: View all orders
router.get('/', protect, isAdmin, getAllOrders);

// Admin: Update order status
router.put('/:orderId/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
