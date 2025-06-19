const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load env variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Load models (this makes sure schemas are registered before use)
require('./models/user');
require('./models/Product');
require('./models/Order');
require('./models/Cart'); // ✅ Add if not already

// ✅ Import all route files
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// ✅ Use all routes with base paths
app.use('/api/users', userRoutes);          // User profile, admin user mgmt
app.use('/api/auth', authRoutes);           // Login/register
app.use('/api/products', productRoutes);    // Artisan product CRUD
app.use('/api/orders', orderRoutes);        // Orders (place/view)
app.use('/api/cart', cartRoutes);           // Add/view/delete from cart
app.use('/api/admin', adminRoutes);         // Admin approval & dashboard
app.use('/api/payment', paymentRoutes);
