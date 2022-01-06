import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateDeliveryStatus } from '../../actions/orderActions'
import Message from '../../components/HelperComonents/Message'
import {
  ORDER_DELIVERY_STATUS_RESET,
  ORDER_DETAILS_RESET,
} from '../../constants/orderConstants'

const ViewOrderScreen = () => {
  document.title = 'Order Details'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, order, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDeliveryStatus = useSelector((state) => state.orderDeliveryStatus)
  const { success: successDeliver } = orderDeliveryStatus

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo])

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!order || successDeliver) {
      dispatch(getOrderDetails(orderId))
      dispatch({ type: ORDER_DELIVERY_STATUS_RESET })
    }
  }, [dispatch, orderId, order, successDeliver])

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

  const statusHandler = (e) => {
    order.deliveryStatus = e.target.value
    dispatch(updateDeliveryStatus(order))
  }

  return (
    <>
      {error ? (
        <Message variant='danger '>{error}</Message>
      ) : loading ? (
        <></>
      ) : (
        <>
          <h2>
            <Link
              to={userInfo && userInfo.isAdmin ? '/admin/orderlist' : '/profile'}
            >
              Order
            </Link>{' '}
            / {order._id}
          </h2>
          <Row>
            <Col xs={12} xl={8}>
              <Card className='py-3 px-4'>
                <Row>
                  <Col>
                    <strong>Shipping Address</strong>{' '}
                    <p>
                      {order.shippingAddress.address1}
                      <br />
                      {order.shippingAddress.address2 && (
                        <>
                          {order.shippingAddress.address2} <br />
                        </>
                      )}
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.postalCode}
                      <br />
                      {order.shippingAddress.country}
                    </p>
                  </Col>

                  <Col>
                    <strong>Billing Address</strong>{' '}
                    <p>
                      {order.billingAddress.address1}
                      <br />
                      {order.billingAddress.address2 && (
                        <>
                          {order.billingAddress.address2} <br />
                        </>
                      )}
                      {order.billingAddress.city}, {order.billingAddress.state}{' '}
                      {order.billingAddress.postalCode}
                      <br />
                      {order.billingAddress.country}
                    </p>
                  </Col>

                  <Col>
                    <strong>Payment Method</strong> <p>{order.paymentMethod}</p>
                    {order.paymentMethod === 'Paypal' && (
                      <p>
                        <strong>Transaction Id: </strong>
                        {order.payPalResult.id}
                      </p>
                    )}
                  </Col>
                </Row>
              </Card>
              <h2>Order Status:</h2>
              {order.deliveryStatus === 'Delivered' ? (
                <Message variant='success'>
                  Delivered on {order.updatedAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='info'>{order.deliveryStatus}</Message>
              )}
              <h2>Item Summary</h2>
              <Card>
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={7} className='my-3'>
                          <strong>
                            <Link
                              to={`/product/${item.product}`}
                              className='text-link'
                            >
                              {item.name}
                            </Link>
                          </strong>
                        </Col>

                        <Col className='my-3'>
                          {formatNumber(item.price, 3, true)}
                        </Col>

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
                        $<strong>{order.subTotal}</strong>
                      </Col>
                    </Row>

                    <Row>
                      <Col>Shipping</Col>
                      <Col style={{ textAlign: 'right' }}>
                        $<strong>{addDecimals(order.shippingCost)}</strong>
                      </Col>
                    </Row>

                    <Row>
                      <Col>Tax</Col>
                      <Col style={{ textAlign: 'right' }}>
                        $<strong>{order.tax}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col style={{ textAlign: 'right' }}>
                        $<strong>{order.total}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              {userInfo &&
                userInfo.isAdmin &&
                order.deliveryStatus !== 'Delivered' && (
                  <Form.Select
                    onChange={statusHandler}
                    value={order.deliveryStatus}
                  >
                    <option value='Proccessing'>Proccessing</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Delivered'>Delivered</option>
                  </Form.Select>
                )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default ViewOrderScreen
