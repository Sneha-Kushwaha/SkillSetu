const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ CREATE Order - POST /api/orders
router.post("/", async (req, res) => {
  try {
    const {
      customer, // userId from frontend
      products, // array of { product, quantity }
      totalAmount,
      paymentStatus,
      paymentId,
    } = req.body;

    const order = new Order({
      customer,
      products,
      totalAmount,
      paymentStatus,
      paymentId,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET All Orders for a User - GET /api/orders/:userId
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
