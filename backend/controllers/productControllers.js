import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

//@desc     Fetch products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  let liveOnly = true
  if (req.user && req.user.isAdmin && req.query.liveOnly === 'false')
    liveOnly = false
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keywords = req.query.keyword
  let products = []
  if (keywords) {
    products = await Product.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: keywords,
            path: {
              wildcard: '*',
            },
          },
        },
      },
      { $match: { isLive: true } },
    ])
  } else if (liveOnly) {
    products = await Product.find({}).where('isLive').equals(true)
  } else {
    products = await Product.find({})
  }
  const count = products.length
  const start = pageSize * (page - 1)
  const end = start + pageSize
  const slicedArray = products.slice(start, end)
  res.json({ products: slicedArray, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Get Products with the applied filters
//@route    GET /api/products/filter
//@access   Public
const getFilteredProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  var filters = JSON.parse(req.query.filters)
  var category = filters.category
  var brand = filters.brand?.split(',') || [/|/]
  var filter1 = filters.filter1?.split(',') || [/|/]
  var filter2 = filters.filter2?.split(',') || [/|/]
  var filter3 = filters.filter3?.split(',') || [/|/]
  var filter4 = filters.filter4?.split(',') || [/|/]
  var filter5 = filters.filter5?.split(',') || [/|/]
  var minStock = filters.minStock || 0

  if (!brand[0]) brand = [/|/]
  if (!filter1[0]) filter1 = [/|/]
  if (!filter2[0]) filter2 = [/|/]
  if (!filter3[0]) filter3 = [/|/]
  if (!filter4[0]) filter4 = [/|/]
  if (!filter5[0]) filter5 = [/|/]

  const products = await Product.find({
    $and: [
      { category: category },
      { brand: { $in: brand } },
      { 'filter1.value': filter1 },
      { 'filter2.value': { $in: filter2 } },
      { 'filter3.value': { $in: filter3 } },
      { 'filter4.value': { $in: filter4 } },
      { 'filter5.value': { $in: filter5 } },
      { countInStock: { $gte: minStock } },
    ],
  })
    .where('isLive')
    .equals(true)
  const count = products.length
  const start = pageSize * (page - 1)
  const end = start + pageSize
  const slicedArray = products.slice(start, end)
  res.json({ products: slicedArray, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    let liveOnly = true
    if (req.user && req.user.isAdmin && req.query.liveOnly === 'false')
      liveOnly = false
    let product = []
    if (liveOnly)
      product = await Product.findById(req.params.id).where('isLive').equals(true)
    product = await Product.findById(req.params.id)

    if (product) {
      let reviewIndex = -1
      if (req.user) {
        reviewIndex = product.reviews.findIndex(
          (r) => r.user.toString() === req.user._id.toString()
        )
      }
      res.json({
        _id: product._id,
        name: product.name,
        price: product.price,
        user: product.user,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
        category: product.category,
        countInStock: product.countInStock,
        numReviews: product.numReviews,
        description: product.description,
        isLive: product.isLive,
        index: reviewIndex,
        reviews: product.reviews,
        filter1: product.filter1,
        filter2: product.filter2,
        filter3: product.filter3,
        filter4: product.filter4,
        filter5: product.filter5,
      })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.remove()
      const directory = `uploads/${req.params.id}`
      try {
        fs.rmdirSync(directory, { recursive: true })
        res.json({ message: 'Product removed' })
      } catch (err) {
        res.json({ message: 'Product removed but error removing directory' })
      }
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Create a product
//@route    Post /api/products
//@access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock } = req.body
  const product = new Product({
    name: name,
    price: price,
    user: req.user._id,
    image: ['/images/sample.jpg'],
    filter1: { name: '', value: '' },
    filter2: { name: '', value: '' },
    filter3: { name: '', value: '' },
    filter4: { name: '', value: '' },
    filter5: { name: '', value: '' },
    brand: brand,
    category: category,
    countInStock: countInStock,
    numReviews: 0,
    description: description,
    isLive: false,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    isLive,
    filter1,
    filter2,
    filter3,
    filter4,
    filter5,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.isLive = isLive
    product.filter1 = filter1
    product.filter2 = filter2
    product.filter3 = filter3
    product.filter4 = filter4
    product.filter5 = filter5

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Create new review
//@route    POST /api/products/:id/review
//@access   Private
const reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.firstName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     edit user review
//@route    PUT /api/products/:id/review
//@access   Private
const editReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const reviewToEdit = product.reviews.findIndex(
      (r) => r.user.toString() === req.user._id.toString()
    )

    product.reviews[reviewToEdit].rating = rating
    product.reviews[reviewToEdit].comment = comment
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    const updatedReview = await product.save()

    res.json({ Message: 'Review Updated' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Get top rated products
//@route    POST /api/products/top
//@access   Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ countInStock: { $gt: 0 } })
    .where('isLive')
    .equals(true)
    .sort({ rating: -1 })
    .limit(3)
  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
  editReview,
  getTopProducts,
  getFilteredProducts,
}
