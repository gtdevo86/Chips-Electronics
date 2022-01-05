import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentScreen from '../screens/checkout/PaymentScreen'
import ShippingScreen from '../screens/checkout/ShippingScreen'
import LoginScreen from '../screens/user/LoginScreen'
import ProfileScreen from '../screens/user/ProfileScreen'
import RegisterScreen from '../screens/user/RegisterScreen'
import LogoutScreen from '../screens/user/LogoutScreen'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/profile' element={<ProfileScreen />} exact />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/logout' element={<LogoutScreen />} exact />
    </Routes>
  )
}

export default UserRoutes
