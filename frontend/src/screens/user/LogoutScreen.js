import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions'

const LogoutScreen = () => {
  document.title = 'Logout'

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
    navigate('/login')
  }, [dispatch, navigate])

  return <></>
}

export default LogoutScreen
