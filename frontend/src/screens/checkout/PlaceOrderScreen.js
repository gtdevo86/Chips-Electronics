import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../actions/orderActions'
import Message from '../../components/HelperComonents/Message'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'
import CheckoutSteps from '../../components/OrderComponents/CheckoutSteps'
import ShippingModal from '../../components/OrderComponents/ShippingModal'
import BillingModal from '../../components/OrderComponents/BillingModal'
import PaymentModel from '../../components/OrderComponents/PaymentModal'
import { PayPalButton } from 'react-paypal-button-v2'
import { CLEAR_CART } from '../../constants/cartConstants'

const PlaceOrderScreen = () => {
  document.title = 'Review Order'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems, paymentMethod } = cart

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const [sdkReady, setSdkReady] = useState(false)
  const [shippingShow, setShippingShow] = useState(false)
  const [billingShow, setBillingShow] = useState(false)
  const [paymentShow, setPaymentShow] = useState(false)

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [navigate, cartItems])

  useEffect(() => {
    if (success) {
      dispatch({ type: CLEAR_CART })
      dispatch({ type: ORDER_CREATE_RESET })
      navigate(`/order/${order._id}`)
    }
  }, [dispatch, navigate, success, order])

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&disable-funding=credit,card`
      script.async = true

      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [])

  const successPaymentHandler = (paymentResult) => {
    const { id, status, update_time, payer } = paymentResult
    const { email_address } = payer
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        billingAddress: cart.billingAddress,
        paymentMethod: cart.paymentMethod,
        payPalResult: { id, status, update_time, email_address },
        subTotal: cart.subTotal,
        shippingCost: cart.shippingCost,
        tax: cart.tax,
        total: cart.total,
      })
    )
  }

  const placeOrderHandler = () => {}

  const formatNumber = (num, digits, money) => {
    let spaces = ''
    let moneyChar = ''
    if (money === true) moneyChar = '$'
    let value = Math.pow(10, digits)
    for (let x = 1; x < digits; x++) {
      value = value / 10
      if (num < value) {
        spaces = spaces + ' '
      } else {
        return spaces + moneyChar + num
      }
    }
    return spaces + moneyChar + num
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.subTotal = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingCost = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * 4, 0)
  )

  cart.tax = addDecimals(Number(0.0725 * cart.subTotal).toFixed(2))

  cart.total = addDecimals(
    Number(cart.subTotal) + Number(cart.shippingCost) + Number(cart.tax)
  )

  return (
    <>
      <CheckoutSteps step={3} />
      <Row>
        <h1>Review your Order</h1>
        <Col xs={12} xl={8}>
          <Card className='py-3 px-4'>
            <Row>
              <Col>
                <strong>Shipping Address</strong>{' '}
                <Button
                  type='button'
                  onClick={() => setShippingShow(true)}
                  className='btn-sm'
                >
                  Change
                </Button>
                <p>
                  {cart.shippingAddress.address1}
                  <br />
                  {cart.shippingAddress.address2 && (
                    <>
                      {cart.shippingAddress.address2} <br />
                    </>
                  )}
                  {cart.shippingAddress.city}, {cart.shippingAddress.state}{' '}
                  {cart.shippingAddress.postalCode}
                  <br />
                  {cart.shippingAddress.country}
                </p>
              </Col>

              <Col>
                <strong>Billing Address</strong>{' '}
                <Button
                  type='button'
                  onClick={() => setBillingShow(true)}
                  className='btn-sm'
                >
                  Change
                </Button>
                <p>
                  {cart.billingAddress.address1}
                  <br />
                  {cart.billingAddress.address2 && (
                    <>
                      {cart.billingAddress.address2} <br />
                    </>
                  )}
                  {cart.billingAddress.city}, {cart.billingAddress.state}{' '}
                  {cart.billingAddress.postalCode}
                  <br />
                  {cart.billingAddress.country}
                </p>
              </Col>

              <Col>
                <strong>Payment Method</strong>{' '}
                <Button
                  type='button'
                  onClick={() => setPaymentShow(true)}
                  className='btn-sm'
                >
                  Change
                </Button>
                <p>{cart.paymentMethod}</p>
              </Col>
            </Row>
          </Card>

          <h1>Item Summary</h1>

          <Card>
            <ListGroup variant='flush'>
              {cart.cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={6} className='my-3'>
                      <strong>
                        <Link to={`/product/${item.product}`} className='text-link'>
                          {item.name}
                        </Link>
                      </strong>
                    </Col>

                    <Col className='my-3'>{formatNumber(item.price, 3, true)}</Col>

                    <Col className='my-3'>
                      Qty: {formatNumber(item.qty, 2, false)}
                    </Col>

                    <Col style={{ textAlign: 'right' }} className='my-3'>
                      $<strong>{addDecimals(item.qty * item.price)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col xs={12} xl={4} xxl={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>

                <Row>
                  <Col>Item(s)</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{cart.subTotal}</strong>
                  </Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{cart.shippingCost}</strong>
                  </Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{cart.tax}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col style={{ textAlign: 'right' }}>
                    $<strong>{cart.total}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <div className='d-grid gap-2'>
                    {paymentMethod === 'Paypal' ? (
                      <>
                        {!sdkReady ? (
                          <></>
                        ) : (
                          <PayPalButton
                            amount={cart.total}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </>
                    ) : (
                      <Button type='button' onClick={placeOrderHandler}>
                        Place Order
                      </Button>
                    )}
                  </div>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ShippingModal show={shippingShow} onHide={() => setShippingShow(false)} />
      <BillingModal show={billingShow} onHide={() => setBillingShow(false)} />
      <PaymentModel show={paymentShow} onHide={() => setPaymentShow(false)} />
    </>
  )
}

export default PlaceOrderScreen
