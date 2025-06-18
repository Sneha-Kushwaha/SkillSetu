// config/razorpay.js
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

// Creating a new Razorpay instance using your keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default razorpay;
