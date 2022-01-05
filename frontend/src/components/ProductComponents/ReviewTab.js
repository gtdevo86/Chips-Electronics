import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../HelperComonents/Message'
import Rating from './Rating'
import {
  listProductDetails,
  createProductReview,
} from '../../actions/productActions'
import ReviewModal from './ReviewModal'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'

const ReviewTab = (props) => {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewShow, setReviewShow] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: reviewError, success: reviewSuccess } = productReviewCreate

  useEffect(() => {
    if (reviewSuccess) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      let extraparam = ''
      if (userInfo) extraparam = 'loggedIn'
      dispatch(listProductDetails(props.id, extraparam))
    }
  }, [dispatch, props.id, reviewSuccess, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(props.id, { rating, comment }))
  }

  return (
    <>
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
                <p>Review created at: {review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            )}
            {!userInfo && (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>Review created at: {review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            )}
          </>
        ))}
        {product.index === -1 && (
          <ListGroup.Item>
            <h2>Write a Customer Review </h2>
            {reviewError && <Message variant='danger'>{reviewError}</Message>}
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
      {userInfo && product.reviews.length > 0 && product.index > -1 && (
        <ReviewModal
          id={props.id}
          show={reviewShow}
          onHide={() => setReviewShow(false)}
        />
      )}
    </>
  )
}

export default ReviewTab
