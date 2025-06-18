const Product = require('../models/Product');

// Create new product (Artisan use)
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all approved products with search, filters, sorting
const getAllProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sortBy } = req.query;
    let query = { isApproved: true };

    if (keyword) query.name = { $regex: keyword, $options: 'i' };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === 'priceAsc') sortOption = { price: 1 };
    else if (sortBy === 'priceDesc') sortOption = { price: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get all unapproved products
const getUnapprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Approve product
const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.isApproved = true;
    await product.save();
    res.json({ message: 'Product approved successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Artisan: Get products uploaded by a specific artisan
const getArtisanProducts = async (req, res) => {
  try {
    const { artisanId } = req.params;
    const products = await Product.find({ artisan: artisanId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ⭐ Add a review to a product
const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUnapprovedProducts,
  approveProduct,
  getArtisanProducts,
  addProductReview,
};
