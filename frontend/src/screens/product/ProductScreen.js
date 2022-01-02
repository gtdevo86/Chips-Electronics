import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import {
  listProductDetails,
  createProductReview,
} from '../../actions/productActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Helmet } from 'react-helmet'
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DETAILS_RESET,
} from '../../constants/productConstants'
import ReviewModal from '../../components/ReviewModal'

const ProductScreen = () => {
  //document.title = 'loading...'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewShow, setReviewShow] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: reviewError, success: reviewSuccess } = productReviewCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    dispatch({ type: PRODUCT_DETAILS_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!product.name && !loading) {
      let extraparam = ''
      if (userInfo) extraparam = 'loggedIn'
      dispatch(listProductDetails(params.id, extraparam))
    }
    if (reviewSuccess) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      let extraparam = ''
      if (userInfo) extraparam = 'loggedIn'
      dispatch(listProductDetails(params.id, extraparam))
    }
  }, [dispatch, params, reviewSuccess, product, userInfo, loading])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(params.id, { rating, comment }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
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
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
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
          <Row>
            <Col lg={9}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.index > -1 && (
                  <ListGroup.Item key={product.reviews[product.index]._id}>
                    <strong>
                      <p>My Review:</p>
                      {product.reviews[product.index].name}{' '}
                      <Link to='' onClick={() => setReviewShow(true)}>
                        Edit Review
                      </Link>
                    </strong>
                    <Rating value={product.reviews[product.index].rating} />
                    <p>
                      Review created at:{' '}
                      {product.reviews[product.index].createdAt.substring(0, 10)}
                    </p>
                    <p>{product.reviews[product.index].comment}</p>
                  </ListGroup.Item>
                )}
                {product.reviews.map((review) => (
                  <>
                    {userInfo && userInfo._id !== review.user && (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>
                          Review created at: {review.createdAt.substring(0, 10)}
                        </p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    )}
                    {!userInfo && (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>
                          Review created at: {review.createdAt.substring(0, 10)}
                        </p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    )}
                  </>
                ))}
                {product.index === -1 && (
                  <ListGroup.Item>
                    <h2>Write a Customer Review </h2>
                    {reviewError && (
                      <Message variant='danger'>{reviewError}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                      </Form>
                    ) : (
                      <Message>Sign in to write a review</Message>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
      {userInfo && product.reviews.length > 0 && product.index > -1 && (
        <ReviewModal
          id={params.id}
          show={reviewShow}
          onHide={() => setReviewShow(false)}
        />
      )}
    </>
  )
}

export default ProductScreen
