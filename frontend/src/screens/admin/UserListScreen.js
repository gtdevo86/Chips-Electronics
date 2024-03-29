import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/HelperComonents/Message'
import { deleteUser, listUsers } from '../../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import Loader from '../../components/Loader'

const UserListScreen = () => {
  document.title = 'User List'
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th style={{ width: '70px', textAlign: 'center' }}>ADMIN</th>
              <th style={{ width: '70px', textAlign: 'center' }}>EDIT</th>
              <th style={{ width: '70px', textAlign: 'center' }}>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>

                <td>
                  {user.firstName} {user.lastName}
                </td>

                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td style={{ textAlign: 'center' }}>
                  {user.isAdmin ? (
                    <FontAwesomeIcon icon={faCheck} color='green' />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} color='red' />
                  )}
                </td>

                <td style={{ textAlign: 'center' }}>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className='btn-sm'>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </LinkContainer>
                </td>

                <td style={{ textAlign: 'center' }}>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
