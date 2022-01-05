import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../../components/HelperComonents/Message'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CheckoutSteps from '../../components/OrderComponents/CheckoutSteps'
import queryString from 'query-string'

const CartScreen = () => {
  document.title = 'Shopping Cart'

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const parsed = queryString.parse(location.search)

  const qty = parsed.qty

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const productId = params.id

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
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
    <Row>
      <CheckoutSteps step={0} />
      <h1>Shopping Cart</h1>
      <Col xs={12} xl={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <Card>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className='py-3'>
                  <Row>
                    <Col xs={2} md={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className='cart-image'
                      />
                    </Col>

                    <Col className='my-4' xs={10} md={6} xxl={7}>
                      <Link to={`/product/${item.product}`} className='text-link'>
                        {item.name}
                      </Link>
                    </Col>

                    <Col className='my-4'>${item.price}</Col>

                    <Col className='cart-row-items'>
                      <Form.Select
                        className='my-3'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, Number(e.target.value)))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col className='my-3'>
                      <Button
                        type='button'
                        varient='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
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

            <ListGroup.Item>
              <div className='d-grid gap-2'>
                <Button
                  onClick={checkoutHandler}
                  type='button'
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
