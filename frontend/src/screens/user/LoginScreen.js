import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import { login } from '../../actions/userActions'
import FormContainer from '../../components/HelperComonents/FormContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { USER_LOGIN_RESET } from '../../constants/userConstants'
import queryString from 'query-string'

const LoginScreen = () => {
  document.title = 'Sign in'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const parsed = queryString.parse(location.search)

  const redirect = parsed.redirect === 'register' ? '' : parsed.redirect

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`)
    }
  }, [navigate, userInfo, redirect])

  useEffect(() => {
    dispatch({ type: USER_LOGIN_RESET })
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer id='login-form'>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
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
              <FontAwesomeIcon icon={faKey} />
            </InputGroup.Text>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <div className='d-grid gap-2'>
          <Button type='submit' variant='primary'>
            Sign in
          </Button>
        </div>
      </Form>
      <hr />
      <Row className='my-1'>
        <Col className='text-center' md={12}>
          Don't have an account?{' '}
          <Link to={redirect ? `/register?=${redirect}` : '/register'}>
            Sign Up
          </Link>
        </Col>

        {/*<Col className='text-center'>
          <Link to={'/login/forgetPassword'}>Forget your password?</Link>
        </Col>*/}
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
