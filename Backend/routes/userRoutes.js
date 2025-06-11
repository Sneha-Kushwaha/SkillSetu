// backend/routes/userRoutes.js

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Logged-in user routes
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);

// Admin-only routes
router.get('/', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isAdmin, deleteUser);

export default router;
