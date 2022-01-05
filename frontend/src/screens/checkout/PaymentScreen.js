import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckoutSteps from '../../components/OrderComponents/CheckoutSteps'
import { LinkContainer } from 'react-router-bootstrap'
import { CART_SAVE_PAYMENT_RESET } from '../../constants/cartConstants'
import Message from '../../components/HelperComonents/Message'

const PaymentScreen = () => {
  document.title = 'Payment Information'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cvv, setCVV] = useState('')

  const cart = useSelector((state) => state.cart)
  const { cartItems, error, paymentMethodSuccess } = cart

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [navigate, cartItems])

  useEffect(() => {
    dispatch({ type: CART_SAVE_PAYMENT_RESET })
  }, [dispatch])

  useEffect(() => {
    if (paymentMethodSuccess) {
      dispatch({ type: CART_SAVE_PAYMENT_RESET })
      navigate('/placeorder')
    }
  }, [dispatch, navigate, paymentMethodSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)

  const shipping = addDecimals(
    cartItems.reduce((acc, item) => acc + item.qty * 4, 0)
  )

  return (
    <>
      <CheckoutSteps step={2} />
      <Row>
        <h1>Payment Method</h1>
        <Col xs={12} xl={8}>
          <Form id='paymentForm' onSubmit={submitHandler}>
            <Card className='px-3'>
              <ListGroup variant='flush'>
                {error && <Message variant='danger'>{error}</Message>}
                <ListGroup.Item>
                  <Form.Check
                    type='radio'
                    label='Pay with Credit Card'
                    id='Stripe'
                    name='paymentMethod'
                    value='Stripe'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </ListGroup.Item>
                {paymentMethod === 'Stripe' && (
                  <ListGroup.Item>
                    <Row>
                      <Form.Group as={Col} controlId='name' className='my-1'>
                        <Form.Label>First Name</Form.Label>
                        <Col>
                          <Form.Control
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Col} controlId='name' className='my-1'>
                        <Form.Label>Last Name</Form.Label>
                        <Col>
                          <Form.Control
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            required
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group as={Col} controlId='cardnumber' className='my-1'>
                        <Form.Label>Card Number</Form.Label>
                        <Col>
                          <Form.Control
                            type='text'
                            placeholder='Card Number'
                            value={cardNumber}
                            required
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId='expireDate' className='my-1'>
                        <Form.Label>Expiration Date</Form.Label>
                        <Col>
                          <Form.Control
                            type='text'
                            placeholder='Exp Date'
                            value={expDate}
                            required
                            onChange={(e) => setExpDate(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Col} controlId='cvv' className='my-1'>
                        <Form.Label>CVV</Form.Label>
                        <Col>
                          <Form.Control
                            type='text'
                            placeholder='CVV'
                            value={cvv}
                            required
                            onChange={(e) => setCVV(e.target.value)}
                          />
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Form>
          <Row className='my-2'>
            <Col className='d-grid'>
              <LinkContainer to={'/shipping'}>
                <Button>Shipping Information</Button>
              </LinkContainer>
            </Col>
            <Col className='d-grid'>
              <Button type='submit' form='paymentForm'>
                Review your Order
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} xl={4} xxl={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>
                <Row>
                  <Col>Item(s):</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{subtotal}</strong>
                  </Col>
                </Row>

                <Row>
                  <Col>Shipping:</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{shipping}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Est total:</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{Number(subtotal) + Number(shipping)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PaymentScreen
