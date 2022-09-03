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
    protected: true,
    adminRequired: true,
  },
  {
    path: '/admin/userlist',
    element: <UserListScreen />,
    protected: true,
    adminRequired: true,
  },
  {
    path: '/admin/productlist',
    element: <ProductListScreen />,
    protected: true,
    adminRequired: true,
  },
  {
    path: '/admin/orderlist',
    element: <OrderListScreen />,
    protected: true,
    adminRequired: true,
  },
  {
    path: '/admin/product/:id/edit',
    element: <ProductEditScreen />,
    protected: true,
    adminRequired: true,
  },
  {
    path: '/admin/product/create',
    element: <ProductCreateScreen />,
    protected: true,
    adminRequired: true,
  },
]

export default AdminRoutes
