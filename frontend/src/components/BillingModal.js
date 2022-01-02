import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveAddress } from '../actions/cartActions'
import StateSelector from './StateSelector'

const ShippingModal = (props) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, billingAddress } = cart

  const [bAddress1, setBAddress1] = useState(billingAddress.address1)
  const [bAddress2, setBAddress2] = useState(billingAddress.address2)
  const [bCity, setBCity] = useState(billingAddress.city)
  const [bState, setBState] = useState(billingAddress.state)
  const [bPostalCode, setBPostalCode] = useState(billingAddress.postalCode)
  const [bCountry, setBCountry] = useState(billingAddress.country)

  const handleChange = (newValue) => {
    setBState(newValue)
  }

  const submitHandler = (e) => {
    dispatch(
      saveAddress([
        shippingAddress,
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
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Billing Address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Form id='billingForm' onSubmit={submitHandler}>
            <Row>
              <Form.Group as={Col} controlId='bAddress1' className='my-1'>
                <Form.Label>Address Line 1</Form.Label>
                <Col>
                  <Form.Control
                    type='text'
                    placeholder='Address Line 1'
                    value={bAddress1}
                    required
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
                    onChange={(e) => setBCity(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Col} controlId='bState' className='my-1'>
                <Form.Label>State</Form.Label>
                <Col>
                  <StateSelector value={bState} onChange={handleChange} />
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
                    required
                    onChange={(e) => setBCountry(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Row>
          </Form>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='billingForm'>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShippingModal
