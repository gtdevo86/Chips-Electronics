import express from 'express'
import {
  createProduct,
  deleteProduct,
  editReview,
  getFilteredProducts,
  getProductById,
  getProductByIdAdmin,
  getProductByIdLoggedin,
  getProducts,
  getProductsAdmin,
  getTopProducts,
  purgeImages,
  reviewProduct,
  updateProduct,
} from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/filter').get(getFilteredProducts)
router.route('/admin').get(protect, admin, getProductsAdmin)
router.route('/top').get(getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
router.route('/:id/admin').get(protect, admin, getProductByIdAdmin)
router.route('/:id/purgeImages').delete(protect, admin, purgeImages)
router.route('/:id/review').post(protect, reviewProduct)
router.route('/:id/review').put(protect, editReview)
router.route('/:id/loggedIn').get(protect, getProductByIdLoggedin)

export default router
