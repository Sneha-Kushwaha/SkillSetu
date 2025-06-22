
import razorpay from '../config/razorpay.js';
import crypto from 'crypto';

// To create a payment order from frontend
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay accepts amount in paisa
      currency: 'INR',
      receipt: 'receipt_order_' + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ success: false, message: 'Payment order creation failed' });
  }
};

// To verify payment signature after transaction
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
