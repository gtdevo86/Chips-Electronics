import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faKey,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const ProfileScreen = () => {
  document.title = 'User Profile'

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const myOrders = useSelector((state) => state.myOrders)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders

  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
  }, [dispatch])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.firstName || user._id !== userInfo._id) {
        dispatch(getUserDetails('profile'))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
      }
      dispatch(listMyOrders())
    }
  }, [dispatch, navigate, userInfo, user])

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setMessage('')
      dispatch(
        updateUserProfile({ id: user._id, firstName, lastName, email, password })
      )
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='firstName' className='my-2'>
            <InputGroup>
              <InputGroup.Text className='form-icon'>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type='firstName'
                placeholder='First Name'
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId='lastName' className='my-2'>
            <InputGroup>
              <InputGroup.Text className='form-icon'>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type='lastName'
                placeholder='Last Name'
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <InputGroup>
              <InputGroup.Text className='form-icon'>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ textAlign: 'center' }}
                />
              </InputGroup.Text>
              <Form.Control
                type='email'
                placeholder='Email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId='password' className='my-2'>
            <InputGroup>
              <InputGroup.Text className='form-icon'>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId='confirmPassword' className='my-2'>
            <InputGroup>
              <InputGroup.Text className='form-icon'>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div className='d-grid gap-2'>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <></>
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped borders hover responsive className='table=sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th style={{ width: '155px' }}>DELIVERY STATUS</th>
                <th style={{ textAlign: 'right ' }}>TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>

                  <td>{order.createdAt.substring(0, 10)}</td>

                  <td>{order.deliveryStatus}</td>

                  <td style={{ textAlign: 'right' }}>
                    ${addDecimals(order.total)}
                  </td>

                  <td style={{ textAlign: 'center ' }}>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
