const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existing = await Cart.findOne({ user: req.user._id, product: productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: "Quantity updated in cart" });
    }

    const cartItem = new Cart({
      user: req.user._id,
      product: productId,
      quantity,
    });
    await cartItem.save();
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user._id }).populate('product');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cart' });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

module.exports = { addToCart, getCartItems, removeFromCart };
