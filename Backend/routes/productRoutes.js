const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUnapprovedProducts,
  approveProduct,
  getArtisanProducts,
  addProductReview // ✅ New controller for adding reviews
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// 📌 Public Routes
router.get('/', getAllProducts); // Browse products
router.get('/:id', getProductById); // Single product view

// 📌 Artisan Routes
router.post('/', protect, createProduct); // Create product
router.get('/artisan/:artisanId', protect, getArtisanProducts); // Get products by artisan

// 📌 Admin Routes
router.get('/admin/unapproved', protect, isAdmin, getUnapprovedProducts); // List of unapproved products
router.put('/admin/approve/:id', protect, isAdmin, approveProduct); // Approve product

// 📌 Update/Delete (can be protected for artisan or admin)
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

// ⭐ Product Reviews (Public but requires login)
router.post('/:id/reviews', protect, addProductReview); // ✅ Add product review

module.exports = router;
