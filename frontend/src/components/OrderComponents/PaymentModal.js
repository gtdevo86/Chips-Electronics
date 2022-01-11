import React, { useState } from 'react'
import { Button, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap'

const ShippingModal = (props) => {
  const submitHandler = (e) => {}
  const [paymentMethod, setPaymentMethod] = useState('Paypal')
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Form.Check
              type='radio'
              label='Pay with Credit Card'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </ListGroup.Item>
          {paymentMethod === 'Stripe' && (
            <ListGroup.Item>
              <Row>
                <Form.Group as={Col} controlId='name' className='my-1'>
                  <Form.Label>First Name</Form.Label>
                  <Col>
                    <Form.Control type='text' placeholder='First Name' required />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} controlId='name' className='my-1'>
                  <Form.Label>Last Name</Form.Label>
                  <Col>
                    <Form.Control type='text' placeholder='Last Name' required />
                  </Col>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='cardnumber' className='my-1'>
                  <Form.Label>Card Number</Form.Label>
                  <Col>
                    <Form.Control type='text' placeholder='Card Number' required />
                  </Col>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId='expireDate' className='my-1'>
                  <Form.Label>Expiration Date</Form.Label>
                  <Col>
                    <Form.Control type='text' placeholder='Exp Date' required />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='cvv' className='my-1'>
                  <Form.Label>CVV</Form.Label>
                  <Col>
                    <Form.Control type='text' placeholder='CVV' required />
                  </Col>
                </Form.Group>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Form.Check
              type='radio'
              label='Pay with Paypal'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              defaultChecked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </ListGroup.Item>
        </ListGroup>
        <Form id='paymentForm' onSubmit={submitHandler}></Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='paymentForm'>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShippingModal
