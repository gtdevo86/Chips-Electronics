import React from 'react'
import PaymentScreen from '../screens/checkout/PaymentScreen'
import ShippingScreen from '../screens/checkout/ShippingScreen'
import LoginScreen from '../screens/user/LoginScreen'
import ProfileScreen from '../screens/user/ProfileScreen'
import RegisterScreen from '../screens/user/RegisterScreen'
import LogoutScreen from '../screens/user/LogoutScreen'

const UserRoutes = [
  {
    path: '/payment',
    element: <PaymentScreen />,
  },
  {
    path: '/shipping',
    element: <ShippingScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
  },
  {
    path: '/register',
    element: <RegisterScreen />,
  },
  {
    path: '/logout',
    element: <LogoutScreen />,
  },
]

export default UserRoutes
