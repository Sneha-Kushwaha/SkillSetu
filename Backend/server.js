// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Load models
require('./models/User');
require('./models/Product');
require('./models/Order');

// Import routes
const userRoutes = require('./routes/userRoutes');
// (Add other routes here when ready, like authRoutes, productRoutes, etc.)

// Use Routes
app.use('/api/users', userRoutes);

// Sample test route
app.get('/', (req, res) => {
  res.send('SkillSetu backend is working ✅');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
