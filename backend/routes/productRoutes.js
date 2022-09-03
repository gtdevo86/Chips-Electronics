import express from 'express'
import {
  createProduct,
  deleteProduct,
  editReview,
  getFilteredProducts,
  getProductById,
  getProducts,
  getTopProducts,
  reviewProduct,
  updateProduct,
} from '../controllers/productControllers.js'
import { protect, admin, optional } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(optional, getProducts).post(protect, admin, createProduct)
router.route('/filter').get(getFilteredProducts)
router.route('/top').get(getTopProducts)
router
  .route('/:id')
  .get(optional, getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
router.route('/:id/review').post(protect, reviewProduct)
router.route('/:id/review').put(protect, editReview)

export default router
