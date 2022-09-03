import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import FormContainer from '../../components/HelperComonents/FormContainer'
import { createProduct } from '../../actions/productActions'

const ProductCreateScreen = () => {
  document.title = 'Create Product'

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')

  const productCreate = useSelector((state) => state.productCreate)
  const { product, error: errorCreate, success: successCreate } = productCreate

  useEffect(() => {
    if (successCreate) {
      navigate(`/admin/product/${product._id}/edit`)
    }
  }, [navigate, successCreate, product])

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        price,
        brand,
        category,
        countInStock,
        description,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer id='edit-product-form'>
        <h1 style={{ textAlign: 'center' }}>Create Product</h1>
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Card className='py-3 px-3'>
          <Form onSubmit={submitHandler} id='createForm'>
            <Row>
              <Col>
                <Form.Group controlId='name'>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Name'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='price'>
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='brand' className='my-2'>
                  <Form.Label>Brand:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Brand'
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId='category' className='my-2'>
                  <Form.Label>Category:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Category'
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId='countInStock' className='my-2'>
                  <Form.Label>Count in Stock:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Count in stock'
                    value={countInStock}
                    required
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='description'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='text'
                placeholder='Description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card>
        <Row className='my-2'>
          <Col className='d-grid'>
            <Button type='submit' variant='primary' form='createForm'>
              Create Product
            </Button>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen
