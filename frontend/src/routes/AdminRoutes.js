import React from 'react'
import OrderListScreen from '../screens/admin/OrderListScreen'
import ProductCreateScreen from '../screens/admin/ProductCreateScreen'
import ProductEditScreen from '../screens/admin/ProductEditScreen'
import ProductListScreen from '../screens/admin/ProductListScreen'
import UserEditScreen from '../screens/admin/UserEditScreen'
import UserListScreen from '../screens/admin/UserListScreen'

const AdminRoutes = [
  {
    path: '/admin/user/:id/edit',
    element: <UserEditScreen />,
  },
  {
    path: '/admin/userlist',
    element: <UserListScreen />,
  },
  {
    path: '/admin/productlist',
    element: <ProductListScreen />,
  },
  {
    path: '/admin/orderlist',
    element: <OrderListScreen />,
  },
  {
    path: '/admin/product/:id/edit',
    element: <ProductEditScreen />,
  },
  {
    path: '/admin/product/create',
    element: <ProductCreateScreen />,
  },
]

export default AdminRoutes
