import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeInUrl } from '../actions/urlActions'
import { logout } from '../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import SearchBox from './ProductComponents/SearchBox'
import MenuOffcanvas from './ProductComponents/MenuOffcanvas'

const Header = (props) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { basePath, fullPath } = useSelector((state) => state.url)
  const userLogin = useSelector((state) => state.userLogin)
  const [showComponentMenu, setshowComponentMenu] = useState(false)

  const handleShow = () => setshowComponentMenu(true)

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
            <Navbar.Brand>Chips Electronics</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav.Link onClick={handleShow}> Components</Nav.Link>
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
      <MenuOffcanvas
        show={showComponentMenu}
        onHide={() => setshowComponentMenu(false)}
      />
    </header>
  )
}

export default Header
