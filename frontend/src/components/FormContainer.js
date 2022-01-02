import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = (props) => {
  return (
    <Container id={props.id}>
      <Row className='justify-content-center'>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  )
}

export default FormContainer
