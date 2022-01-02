import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateDeliveryStatus,
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/updateStatus').put(protect, admin, updateDeliveryStatus)

export default router
