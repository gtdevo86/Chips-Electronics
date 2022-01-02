import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/product/HomeScreen'
import ProductScreen from './screens/product/ProductScreen'
import CustomRouter from './helpers/CustomRouter'
import history from './helpers/customHistory'
import UserEditScreen from './screens/admin/UserEditScreen'
import UserListScreen from './screens/admin/UserListScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ViewOrderScreen from './screens/user/ViewOrderScreen'
import PlaceOrderScreen from './screens/checkout/PlaceOrderScreen'
import PaymentScreen from './screens/checkout/PaymentScreen'
import ShippingScreen from './screens/checkout/ShippingScreen'
import LoginScreen from './screens/user/LoginScreen'
import ProfileScreen from './screens/user/ProfileScreen'
import CartScreen from './screens/checkout/CartScreen'
import RegisterScreen from './screens/user/RegisterScreen'
import LogoutScreen from './screens/user/LogoutScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import ProductCreateScreen from './screens/admin/ProductCreateScreen'
import OrderListScreen from './screens/admin/OrderListScreen'

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('white')
  const { fullPath } = useSelector((state) => state.url)

  const whiteRegexArray = useMemo(
    () => [
      'login',
      'product\\/',
      'register',
      'profile',
      'userlist',
      'productlist',
      'orderlist',
      'productlist',
    ],
    []
  )

  useEffect(() => {
    if (String(fullPath).match('admin/product/')) {
      setBackgroundColor('#EAEDED')
    } else if (
      whiteRegexArray.filter((regex) => String(fullPath).match(regex)).length >= 1
    )
      setBackgroundColor('white')
    else setBackgroundColor('#EAEDED')
  }, [fullPath, whiteRegexArray])

  return (
    <CustomRouter history={history}>
      <Header />
      <div style={{ background: backgroundColor }}>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/productlist' element={<ProductListScreen />} />
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route
                path='/admin/product/create'
                element={<ProductCreateScreen />}
              />
              <Route path='/order/:id' element={<ViewOrderScreen />} />
              <Route path='/placeOrder' element={<PlaceOrderScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/profile' element={<ProfileScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/cart/:id' element={<CartScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/search' element={<HomeScreen />} />
              <Route path='/logout' element={<LogoutScreen />} exact />
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </CustomRouter>
  )
}

export default App
