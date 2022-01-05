import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveAddress } from '../../actions/cartActions'
import StateSelector from './StateSelector'

const ShippingModal = (props) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, billingAddress } = cart

  const [sAddress1, setSAddress1] = useState(shippingAddress.address1)
  const [sAddress2, setSAddress2] = useState(shippingAddress.address2)
  const [sCity, setSCity] = useState(shippingAddress.city)
  const [sState, setSState] = useState(shippingAddress.state)
  const [sPostalCode, setSPostalCode] = useState(shippingAddress.postalCode)
  const [sCountry, setSCountry] = useState(shippingAddress.country)

  const handleChange = (newValue) => {
    setSState(newValue)
  }

  const submitHandler = (e) => {
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
        billingAddress,
      ])
    )
  }
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Shipping Address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Form id='shippingForm' onSubmit={submitHandler}>
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
                  <StateSelector value={sState} onChange={handleChange} />
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
          </Form>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='shippingForm'>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShippingModal
