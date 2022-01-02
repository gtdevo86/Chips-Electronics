import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`} style={{ textAlign: 'center' }}>
        <Card.Img src={product.image[0]} variant='top' className='product-image' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className='text-link'>
          <Card.Title as='div' style={{ height: '3.5rem' }}>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`(${product.numReviews})`} />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
