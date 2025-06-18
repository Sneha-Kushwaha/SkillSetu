// routes/orderRoutes.js
const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// ✅ Customer places an order
router.post('/', protect, placeOrder);

// ✅ Customer views their orders
router.get('/my-orders', protect, getMyOrders);

// ✅ View single order (customer/admin)
router.get('/:id', protect, getOrderById);

// ✅ Admin updates order status (e.g., shipped, delivered)
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
