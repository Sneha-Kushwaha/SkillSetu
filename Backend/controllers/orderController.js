// Handles order creation and fetching

import Order from '../models/Order.js';

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentId } = req.body;

    const newOrder = new Order({
      user: req.user.userId,
      items,
      totalAmount,
      paymentId,
      status: "Processing"
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
