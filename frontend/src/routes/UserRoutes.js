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
    protected: true,
    adminRequired: false,
  },
  {
    path: '/shipping',
    element: <ShippingScreen />,
    protected: true,
    adminRequired: false,
  },
  {
    path: '/login',
    element: <LoginScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
    protected: true,
    adminRequired: false,
  },
  {
    path: '/register',
    element: <RegisterScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/logout',
    element: <LogoutScreen />,
    protected: false,
    adminRequired: false,
  },
]

export default UserRoutes
