import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'

//@desc     Create new order
//@route    POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    billingAddress,
    paymentMethod,
    payPalResult,
    subTotal,
    tax,
    shippingCost,
    total,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      billingAddress,
      paymentMethod,
      payPalResult,
      subTotal,
      tax,
      shippingCost,
      total,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

//@desc     get order by ID
//@route    GET /api/orders/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'firstName lastName email'
    )
    if (order) {
      if (order.user._id.equals(req.user._id) || req.user.isAdmin) {
        res.json(order)
      } else {
        res.status(401)
        throw new Error('You are not authorized to see this page')
      }
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     update delivery status of order
//@route    PUT /api/orders/:id/updateStatus
//@access   Private/Admin
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.deliveryStatus = req.body.deliveryStatus
    if (req.body.deliveryStatus === 'Delivered') {
      order.deliveredAt = Date.now()
    }
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     get logged in user orders
//@route    GET /api/orders/myorders
//@access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//@desc     get All
//@route    GET /api/orders
//@access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id firstName lastName')
  res.json(orders)
})

export { addOrderItems, getOrderById, getMyOrders, getOrders, updateDeliveryStatus }
