import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Tabs,
  Tab,
} from 'react-bootstrap'
import Rating from '../../components/ProductComponents/Rating'
import { listProductDetails } from '../../actions/productActions'
import Message from '../../components/HelperComonents/Message'
import { Helmet } from 'react-helmet'
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DETAILS_RESET,
} from '../../constants/productConstants'
import ReviewTab from '../../components/ProductComponents/ReviewTab'
import DescriptionTab from '../../components/ProductComponents/DescriptionTab'

const ProductScreen = () => {
  //document.title = 'loading...'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [qty, setQty] = useState(1)
  const [tabKey, setTabKey] = useState('Description')

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    dispatch({ type: PRODUCT_DETAILS_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!error && !product._id) {
      dispatch(listProductDetails(params.id))
    }
  }, [dispatch, params, product, error])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <></>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <Col xs={6} lg={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col xs={6} lg={5}>
              <ListGroup variant='flush' className='list-group-item-success'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  Brand: {product.brand}
                  <Rating
                    value={product.rating || 0}
                    text={`(${product.numReviews})`}
                    className='py-3'
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4 style={{ color: '#b12704' }}>
                    <strong>${product.price}</strong>
                  </h4>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                </ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <h4 style={{ color: '#b12704' }}>
                          <strong>${product.price}</strong>
                        </h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <div className='d-grid gap-2'>
                      <Button
                        onClick={addToCartHandler}
                        type='button'
                        disabled={product.countInStock === 0}
                      >
                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Tabs
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className='mb-3 my-5'
          >
            <Tab eventKey='Description' title='Description'>
              <DescriptionTab
                description={product.description}
                tagArray={[
                  product.filter1,
                  product.filter2,
                  product.filter3,
                  product.filter4,
                  product.filter5,
                ]}
              />
            </Tab>
            <Tab eventKey='Reviews' title='Reviews'>
              <ReviewTab id={params.id} />
            </Tab>
          </Tabs>
        </>
      )}
    </>
  )
}

export default ProductScreen
