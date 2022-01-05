import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderListScreen from '../screens/admin/OrderListScreen'
import ProductCreateScreen from '../screens/admin/ProductCreateScreen'
import ProductEditScreen from '../screens/admin/ProductEditScreen'
import ProductListScreen from '../screens/admin/ProductListScreen'
import UserEditScreen from '../screens/admin/UserEditScreen'
import UserListScreen from '../screens/admin/UserListScreen'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      <Route path='/admin/userlist' element={<UserListScreen />} />
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route path='/admin/orderlist' element={<OrderListScreen />} />
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      <Route path='/admin/product/create' element={<ProductCreateScreen />} />
    </Routes>
  )
}

export default AdminRoutes
