import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import products from '../data/products.js'

//@desc     Fetch live products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  let keywords = req.query.keyword.split(' ')
  keywords = keywords.map(function (v) {
    return new RegExp(v, 'i')
  })

  const count = await Product.count({ name: { $in: keywords } })
    .where('isLive')
    .equals(true)
  const products = await Product.find({ name: { $in: keywords } })
    .where('isLive')
    .equals(true)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Fetch all products
//@route    GET /api/products/admin
//@access   Public
const getProductsAdmin = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Product.count({})
  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Fetch single product if live
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id)
    if (product.isLive) {
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
        index: -1,
        reviews: product.reviews,
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

//@desc     Fetch single product if live along with the index of the review of the logged in user
//@route    GET /api/products/:id/loggedIn
//@access   Private
const getProductByIdLoggedin = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id)
    if (product.isLive) {
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
        index: product.reviews.findIndex(
          (r) => r.user.toString() === req.user._id.toString()
        ),
        reviews: product.reviews,
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

//@desc     Fetch single product
//@route    GET /api/products/:id/admin
//@access   Private/Admin
const getProductByIdAdmin = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
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
  const { name, price, description, image, brand, category, countInStock, isLive } =
    req.body

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

//@desc     Remove unused images from given product
//@route    DELETE /api/products/:id/purgeImages
//@access   Private/Admin
const purgeImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const directory = `uploads/${req.params.id}`

  fs.readdir(directory, (err, files) => {
    if (err) res.json(err)
    else {
      try {
        var trimmedImageNames = product.image.map(
          (element) => element.split('\\')[2]
        )
        var filteredFiles = files.filter(function (e) {
          return trimmedImageNames.indexOf(e) == -1
        })

        for (const file of filteredFiles) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err
          })
        }
        res.json({ message: 'Files Deleted' })
      } catch (err) {
        res.json(err)
      }
    }
  })
})

//@desc     Get top rated products
//@route    POST /api/products/top
//@access   Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .where('isLive')
    .equals(true)
    .sort({ rating: -1 })
    .limit(3)
  res.json(products)
})

export {
  getProducts,
  getProductsAdmin,
  getProductById,
  getProductByIdAdmin,
  deleteProduct,
  createProduct,
  updateProduct,
  purgeImages,
  reviewProduct,
  getProductByIdLoggedin,
  editReview,
  getTopProducts,
}
