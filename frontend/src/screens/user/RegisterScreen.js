import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import { register } from '../../actions/userActions'
import FormContainer from '../../components/HelperComonents/FormContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faKey,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { USER_REGISTER_RESET } from '../../constants/userConstants'
import queryString from 'query-string'

const RegisterScreen = () => {
  document.title = 'Create New Account'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const parsed = queryString.parse(location.search)

  const redirect = parsed.redirect ? parsed.redirect : '/'

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate('redirect')
    }
  }, [navigate, userInfo, redirect])

  useEffect(() => {
    dispatch({ type: USER_REGISTER_RESET })
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      dispatch({ type: USER_REGISTER_RESET })
    } else {
      setMessage('')
      dispatch({ type: USER_REGISTER_RESET })
      dispatch(register(firstName, lastName, email, password))
    }
  }

  return (
    <FormContainer id='user-register-form'>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
              <FontAwesomeIcon icon={faEnvelope} />
            </InputGroup.Text>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
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
            Register
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
