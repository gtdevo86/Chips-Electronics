import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/ProductComponents/Product'
import Message from '../../components/HelperComonents/Message'
import { listProducts } from '../../actions/productActions'
import { useLocation } from 'react-router-dom'
import Paginate from '../../components/HelperComonents/Paginate'
import queryString from 'query-string'
import ProductCarousel from '../../components/ProductComponents/ProductCarousel'
import Loader from '../../components/Loader'

const HomeScreen = () => {
  document.title = 'Welcome to Chips Electronics'
  const dispatch = useDispatch()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const keyword = parsed.q
  const pageNumber = parsed.page || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger '>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  )
}

export default HomeScreen
