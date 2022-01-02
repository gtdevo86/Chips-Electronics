import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditScreen = () => {
  document.title = 'Edit Product'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const productId = params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [isLive, setIsLive] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        navigate('/admin/productlist')
      } else if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId, 'admin'))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setIsLive(product.isLive)
      }
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, productId, userInfo, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `/api/upload/${productId}`,
        formData,
        config
      )

      setImage(data)
    } catch (error) {
      console.error(error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        isLive,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer id='edit-product-form'>
        <h1 style={{ textAlign: 'center' }}>Edit Product</h1>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <></>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Card className='px-3 py-3'>
              <Form onSubmit={submitHandler} id='editForm'>
                <Row>
                  <Col>
                    <Form.Group controlId='name' className='my-2'>
                      <Form.Label>Product Name:</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='price' className='my-2'>
                      <Form.Label>Product Price:</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId='image' className='mb-3'>
                      <Form.Label>Upload Product image </Form.Label>
                      <Form.Control
                        type='file'
                        name='foo'
                        custom
                        accept='image/*'
                        onChange={uploadFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='brand' className='my-2'>
                      <Form.Label>Product Brand:</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId='category' className='my-2'>
                      <Form.Label>Product Category:</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='countInStock' className='my-2'>
                      <Form.Label>Product Count in Stock:</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Count in stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId='description' className='my-2'>
                  <Form.Label>Product Description:</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='isadmin' className='my-2'>
                  <Form.Check
                    type='checkbox'
                    label='Product available for sale'
                    checked={isLive}
                    onChange={(e) => setIsLive(e.target.checked)}
                  />
                </Form.Group>
              </Form>
            </Card>
            <Row className='my-2'>
              {/*<Col className='d-grid'>
                <Button type='submit' variant='primary' form='editForm'>
                  Manage Images
                </Button>
              </Col>*/}
              <Col className='d-grid'>
                <Button type='submit' variant='primary' form='editForm'>
                  Update Product
                </Button>
              </Col>
            </Row>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
