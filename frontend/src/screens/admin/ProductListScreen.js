import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faEdit,
  faPlus,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { deleteProduct, listProducts } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import Paginate from '../../components/HelperComonents/Paginate'
import queryString from 'query-string'

const ProductListScreen = () => {
  document.title = 'Product List'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const pageNumber = parsed.page || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    dispatch(listProducts('admin', '', pageNumber))
  }, [dispatch, navigate, userInfo, successDelete, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <LinkContainer to={'/admin/product/create'}>
            <Button className='btn-sm'>
              <FontAwesomeIcon icon={faPlus} color='green' /> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {errorDelete && <Message variant='danger'></Message>}
      {loading || loadingDelete ? (
        <></>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>LIVE</th>
                <th style={{ width: '70px', textAlign: 'center' }}>EDIT</th>
                <th style={{ width: '70px', textAlign: 'center' }}>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>

                  <td>{product.name}</td>

                  <td>${product.price}</td>

                  <td>{product.category}</td>

                  <td>{product.brand}</td>

                  <td style={{ textAlign: 'center' }}>
                    {product.isLive ? (
                      <FontAwesomeIcon icon={faCheck} color='green' />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} color='red' />
                    )}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className='btn-sm'>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </LinkContainer>
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
