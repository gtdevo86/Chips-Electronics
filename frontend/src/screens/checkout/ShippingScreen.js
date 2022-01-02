import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveAddress } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'
import { LinkContainer } from 'react-router-bootstrap'
import StateSelector from '../../components/StateSelector'

const ShippingScreen = () => {
  document.title = 'Shipping Information'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress, billingAddress, cartItems } = cart

  const [sAddress1, setSAddress1] = useState(shippingAddress.address1)
  const [sAddress2, setSAddress2] = useState(shippingAddress.address2)
  const [sCity, setSCity] = useState(shippingAddress.city)
  const [sState, setSState] = useState(shippingAddress.state)
  const [sPostalCode, setSPostalCode] = useState(shippingAddress.postalCode)
  const [sCountry, setSCountry] = useState(shippingAddress.country)

  const [bAddress1, setBAddress1] = useState(billingAddress.address1)
  const [bAddress2, setBAddress2] = useState(billingAddress.address2)
  const [bCity, setBCity] = useState(billingAddress.city)
  const [bState, setBState] = useState(billingAddress.state)
  const [bPostalCode, setBPostalCode] = useState(billingAddress.postalCode)
  const [bCountry, setBCountry] = useState(billingAddress.country)

  const [billingDisabled, setBillingDisabled] = useState(false)

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart')
    }
  }, [navigate, cartItems])

  const submitHandler = (e) => {
    e.preventDefault()
    if (billingDisabled) {
      dispatch(
        saveAddress([
          {
            address1: sAddress1,
            address2: sAddress2,
            city: sCity,
            state: sState,
            postalCode: sPostalCode,
            country: sCountry,
          },
          {
            address1: sAddress1,
            address2: sAddress2,
            city: sCity,
            state: sState,
            postalCode: sPostalCode,
            country: sCountry,
          },
        ])
      )
    } else {
      dispatch(
        saveAddress([
          {
            address1: sAddress1,
            address2: sAddress2,
            city: sCity,
            state: sState,
            postalCode: sPostalCode,
            country: sCountry,
          },
          {
            address1: bAddress1,
            address2: bAddress2,
            city: bCity,
            state: bState,
            postalCode: bPostalCode,
            country: bCountry,
          },
        ])
      )
    }
    navigate('/payment')
  }

  const sameAddressHandler = (e) => {
    setBillingDisabled(e.target.checked)
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

  const handleChange = (tags) => (newValue) => {
    if (tags === 'shipping') setSState(newValue)
    else if (tags === 'billing') setBState(newValue)
  }

  return (
    <>
      <CheckoutSteps step={1} />
      <Row>
        <h1>Shipping Address</h1>
        <Col xs={12} xl={8}>
          <Form id='addressForm' onSubmit={submitHandler}>
            <Card className='px-3 py-3'>
              <Row>
                <Form.Group as={Col} controlId='sAddress1' className='my-1'>
                  <Form.Label>Address Line 1</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Address Line 1'
                      value={sAddress1}
                      required
                      onChange={(e) => setSAddress1(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='sAddress2' className='my-1'>
                  <Form.Label>Address Line 2(Optional)</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Address Line 2'
                      value={sAddress2}
                      onChange={(e) => setSAddress2(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='sCity' className='my-1'>
                  <Form.Label>City</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='City'
                      value={sCity}
                      required
                      onChange={(e) => setSCity(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='sState' className='my-1'>
                  <Form.Label>State</Form.Label>
                  <Col>
                    <StateSelector
                      value={sState}
                      onChange={handleChange('shipping')}
                    />
                  </Col>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='sPostalCode' className='my-1'>
                  <Form.Label>Zip Code</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Zip Code'
                      value={sPostalCode}
                      required
                      onChange={(e) => setSPostalCode(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='sCountry' className='my-1'>
                  <Form.Label>Country</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Country'
                      value={sCountry}
                      required
                      onChange={(e) => setSCountry(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>
            </Card>

            <h1>Billing Address</h1>

            <Card className='px-3 py-3'>
              <Row>
                <Col>
                  {' '}
                  <Form.Check
                    type='checkbox'
                    id='sameAddress'
                    className='mb-2'
                    label='Same as Shipping Address'
                    onChange={(e) => sameAddressHandler(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Group as={Col} controlId='bAddress1' className='my-1'>
                  <Form.Label>Address Line 1</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Address Line 1'
                      value={bAddress1}
                      required
                      disabled={billingDisabled}
                      onChange={(e) => setBAddress1(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='bAddress2' className='my-1'>
                  <Form.Label>Address Line 2(Optional)</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Address Line 2'
                      value={bAddress2}
                      disabled={billingDisabled}
                      onChange={(e) => setBAddress2(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='bCity' className='my-1'>
                  <Form.Label>City</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='City'
                      value={bCity}
                      required
                      disabled={billingDisabled}
                      onChange={(e) => setBCity(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='bState' className='my-1'>
                  <Form.Label>State</Form.Label>
                  <Col>
                    <StateSelector
                      value={bState}
                      disabled={billingDisabled}
                      onChange={handleChange('billing')}
                    />
                  </Col>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId='bPostalCode' className='my-1'>
                  <Form.Label>Zip Code</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Zip Code'
                      value={bPostalCode}
                      required
                      disabled={billingDisabled}
                      onChange={(e) => setBPostalCode(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} controlId='bCountry' className='my-1'>
                  <Form.Label>Country</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Country'
                      value={bCountry}
                      disabled={billingDisabled}
                      required
                      onChange={(e) => setBCountry(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>
            </Card>
          </Form>
          <Row className='my-2'>
            <Col className='d-grid'>
              <LinkContainer to={'/cart'}>
                <Button>Back to Cart</Button>
              </LinkContainer>
            </Col>
            <Col className='d-grid'>
              <Button type='submit' form='addressForm'>
                Proceed to Payment
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

export default ShippingScreen
