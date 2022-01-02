import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeInUrl } from '../actions/urlActions'
import { logout } from '../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import SearchBox from './SearchBox'

const Header = (props) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { basePath, fullPath } = useSelector((state) => state.url)
  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const { userInfo } = userLogin
  useEffect(() => {
    dispatch(changeInUrl(location))
  }, [dispatch, location])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar className='bg-primary navbar-dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Keto Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <SearchBox />
            <Nav className='ms-auto' activeKey={basePath}>
              <LinkContainer to='/cart'>
                <Nav.Link className='shopping-cart-icon'>
                  <FontAwesomeIcon icon={faShoppingCart} /> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={`Hello, ${userInfo.firstName}`} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={`/login?redirect=${fullPath}`}>
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
