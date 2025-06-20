const express = require('express');
const crypto = require('crypto');

const router = express.Router();

router.post('/', (req, res) => {
  const secret = process.env.RAZORPAY_SECRET;

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(req.body);
  const digest = shasum.digest('hex');

  const signature = req.headers['x-razorpay-signature'];

  if (digest === signature) {
    console.log("✅ Razorpay webhook verified");
    
    // TODO: Update order status in DB based on req.body.payload

    res.status(200).json({ status: 'ok' });
  } else {
    console.log("❌ Invalid Razorpay signature");
    res.status(400).json({ status: 'invalid signature' });
  }
});

module.exports = router;
