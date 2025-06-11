// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();
app.use(express.json());

// Load models (auto-register for Mongoose)
require('./models/User');
require('./models/Product');
require('./models/Order');


// Test route
app.get('/', (req, res) => {
  res.send('Desi Etsy backend is working ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
