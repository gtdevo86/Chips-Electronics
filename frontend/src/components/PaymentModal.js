import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const ShippingModal = (props) => {
  const submitHandler = (e) => {}
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Payment Method
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Placehold Text
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
