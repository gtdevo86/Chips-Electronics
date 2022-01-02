import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateDeliveryStatus } from '../../actions/orderActions'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
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
        <Loader />
      ) : (
        <>
          <h1>
            <Link
              to={userInfo && userInfo.isAdmin ? '/admin/orderlist' : '/profile'}
            >
              Order
            </Link>{' '}
            / {order._id}
          </h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.firstName} {order.user.lastName}
                  </p>

                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`} className='text-link'>
                      {order.user.email}
                    </a>
                  </p>

                  <p>
                    <strong>Shipping Address: </strong>
                    {order.shippingAddress.address1},{' '}
                    {order.shippingAddress.address2
                      ? `${order.shippingAddress.address2}, `
                      : ''}{' '}
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    , {order.shippingAddress.country}
                  </p>

                  <p>
                    <strong>Billing Address: </strong>
                    {order.billingAddress.address1},{' '}
                    {order.billingAddress.address2
                      ? `${order.billingAddress.address2}, `
                      : ''}{' '}
                    {order.billingAddress.city}, {order.billingAddress.postalCode},{' '}
                    {order.billingAddress.country}
                  </p>
                  {order.deliveryStatus === 'Delivered' ? (
                    <Message variant='success'>
                      Delivered on {order.updatedAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='info'>{order.deliveryStatus}</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.paymentMethod === 'Paypal' && (
                    <p>
                      <strong>Transaction Id: </strong>
                      {order.payPalResult.id}
                    </p>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Item Summary</h2>
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>

                          <Col>
                            <Link
                              to={`/product/${item.product}`}
                              className='text-link'
                            >
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            <pre>
                              {' '}
                              {formatNumber(item.qty, 2, false)} X{' '}
                              {formatNumber(item.price, 3, true)} ={' '}
                              {formatNumber(
                                addDecimals(item.qty * item.price),
                                4,
                                true
                              )}
                            </pre>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4} xl={3}>
              <ListGroup cariant='flush'>
                <ListGroup.Item>
                  <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col style={{ textAlign: 'right' }}>
                      ${addDecimals(order.subTotal)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col style={{ textAlign: 'right' }}>
                      ${addDecimals(order.shippingCost)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col style={{ textAlign: 'right' }}>
                      ${addDecimals(order.tax)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col style={{ textAlign: 'right' }}>
                      ${addDecimals(order.total)}
                    </Col>
                  </Row>
                </ListGroup.Item>
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
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default ViewOrderScreen
