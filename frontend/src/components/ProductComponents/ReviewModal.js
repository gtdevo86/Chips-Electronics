import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductReview } from '../../actions/productActions'

const ReviewModal = (props) => {
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const [rating, setRating] = useState(product.reviews[product.index].rating)
  const [comment, setComment] = useState(product.reviews[product.index].comment)

  const submitHandler = (e) => {
    dispatch(updateProductReview(props.id, { rating, comment }))
  }
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler} id='reviewForm'>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='reviewForm'>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReviewModal
