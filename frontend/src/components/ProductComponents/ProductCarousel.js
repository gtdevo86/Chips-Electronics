import React, { useEffect } from 'react'
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../../actions/productActions'
import Message from '../HelperComonents/Message'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <></>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary' id='myCarousel' interval='10000'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className='mask flex-center'>
            <Container>
              <Row className='align-items-center'>
                <Col className='col-lg-7 col-12 order-lg-1 order-2'>
                  <h4>{product.name}</h4>
                  <p>
                    {product.description.length > 120
                      ? product.description.substring(0, 120).concat('...')
                      : product.description}{' '}
                  </p>
                  <Link to={`/product/${product._id}`}>Buy Now</Link>
                </Col>
                <Col className='col-lg-5 col-12 order-lg-2 order-1'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className='mx-auto'
                  ></Image>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

/*
<Carousel pause='hover' className='bg-primary'>
{products.map((product) => (
  <Carousel.Item key={product._id}>
    <Link to={`/product/${product._id}`}>
      <Image src={product.image} alt={product.name} fluid></Image>
      <Carousel.Caption className='carousel-caption'>
        <h2>
          {product.name} (${product.price})
        </h2>
      </Carousel.Caption>
    </Link>
  </Carousel.Item>
))}
</Carousel>
*/

export default ProductCarousel
