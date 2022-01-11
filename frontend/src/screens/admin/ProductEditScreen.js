import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import FormContainer from '../../components/HelperComonents/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../constants/productConstants'

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
  const [filter1Name, setFilter1Name] = useState('')
  const [filter1Value, setFilter1Value] = useState('')
  const [filter2Name, setFilter2Name] = useState('')
  const [filter2Value, setFilter2Value] = useState('')
  const [filter3Name, setFilter3Name] = useState('')
  const [filter3Value, setFilter3Value] = useState('')
  const [filter4Name, setFilter4Name] = useState('')
  const [filter4Value, setFilter4Value] = useState('')
  const [filter5Name, setFilter5Name] = useState('')
  const [filter5Value, setFilter5Value] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET })
  }, [dispatch])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        navigate('/admin/productlist')
      } else if (!error) {
        if (!product.name) {
          dispatch(listProductDetails(productId, false))
        } else {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
          setIsLive(product.isLive)
          setFilter1Name(product.filter1.name)
          setFilter1Value(product.filter1.value)
          setFilter2Name(product.filter2.name)
          setFilter2Value(product.filter2.value)
          setFilter3Name(product.filter3.name)
          setFilter3Value(product.filter3.value)
          setFilter4Name(product.filter4.name)
          setFilter4Value(product.filter4.value)
          setFilter5Name(product.filter5.name)
          setFilter5Value(product.filter5.value)
        }
      }
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, productId, userInfo, product, successUpdate, error])

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
    let list = [
      { k: filter1Name, v: filter1Value },
      { k: filter2Name, v: filter2Value },
      { k: filter3Name, v: filter3Value },
      { k: filter4Name, v: filter4Value },
      { k: filter5Name, v: filter5Value },
    ]
    list.sort((a, b) => {
      if (!a.k) return 1
      if (!b.k) return -1
      if (a.k > b.k) return 1
      if (a.k < b.k) return -1
      return 0
    })

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
        filter1: { name: list[0].k, value: list[0].v },
        filter2: { name: list[1].k, value: list[1].v },
        filter3: { name: list[2].k, value: list[2].v },
        filter4: { name: list[3].k, value: list[3].v },
        filter5: { name: list[4].k, value: list[4].v },
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
              <Row>
                <Col>
                  <Form.Group controlId='filter1name' className='my-2'>
                    <Form.Label>Filter 1 Name:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter1Name}
                      onChange={(e) => setFilter1Name(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='filter1value' className='my-2'>
                    <Form.Label>Filter 1 Value:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter1Value}
                      onChange={(e) => setFilter1Value(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='filter2name' className='my-2'>
                    <Form.Label>Filter 2 Name:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter2Name}
                      onChange={(e) => setFilter2Name(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='filter2value' className='my-2'>
                    <Form.Label>Filter 2 Value:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter2Value}
                      onChange={(e) => setFilter2Value(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='filter3name' className='my-2'>
                    <Form.Label>Filter 3 Name:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter3Name}
                      onChange={(e) => setFilter3Name(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='filter3value' className='my-2'>
                    <Form.Label>Filter 3 Value:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter3Value}
                      onChange={(e) => setFilter3Value(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='filter4name' className='my-2'>
                    <Form.Label>Filter 4 Name:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter4Name}
                      onChange={(e) => setFilter4Name(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='filter4value' className='my-2'>
                    <Form.Label>Filter 4 Value:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter4Value}
                      onChange={(e) => setFilter4Value(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='filter5name' className='my-2'>
                    <Form.Label>Filter 5 Name:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter5Name}
                      onChange={(e) => setFilter5Name(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='filter5value' className='my-2'>
                    <Form.Label>Filter 5 Value:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      value={filter5Value}
                      onChange={(e) => setFilter5Value(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
            <Row className='my-2'>
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
