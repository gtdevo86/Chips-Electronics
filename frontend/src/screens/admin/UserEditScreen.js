import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form, Button, InputGroup, Card, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import { getUserDetails, updateUser } from '../../actions/userActions'
import FormContainer from '../../components/HelperComonents/FormContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faUserShield } from '@fortawesome/free-solid-svg-icons'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const UserEditScreen = () => {
  document.title = 'Edit User'

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const userId = params.id

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.firstName || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, userInfo, user, userId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, firstName, lastName, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer id='edit-user-form'>
        <h1 style={{ textAlign: 'center' }}>Edit User</h1>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <></>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Card className='px-3 py-3'>
              <Form onSubmit={submitHandler} id='editForm'>
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

                <Form.Group controlId='email' className='my-3'>
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

                <Form.Group controlId='isadmin'>
                  <InputGroup>
                    <InputGroup.Text className='form-icon isAdmin-icon'>
                      <FontAwesomeIcon icon={faUserShield} />
                    </InputGroup.Text>
                    <Form.Check
                      type='checkbox'
                      label='Is Admin'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card>
            <Row className='my-2'>
              <Col className='d-grid'>
                <Button type='submit' variant='primary' form='editForm'>
                  Update User
                </Button>
              </Col>
            </Row>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
