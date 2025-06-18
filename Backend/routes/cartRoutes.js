const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addToCart);
router.get('/', protect, getCartItems);
router.delete('/:id', protect, removeFromCart);

module.exports = router;
