import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartScreen from '../screens/checkout/CartScreen'
import PlaceOrderScreen from '../screens/checkout/PlaceOrderScreen'
import HomeScreen from '../screens/product/HomeScreen'
import ProductScreen from '../screens/product/ProductScreen'
import ViewOrderScreen from '../screens/user/ViewOrderScreen'
import ProductFilterScreen from '../screens/product/ProductFilterScreen'

const ProductOrderRoutes = () => {
  return (
    <Routes>
      <Route path='/order/:id' element={<ViewOrderScreen />} />
      <Route path='/placeOrder' element={<PlaceOrderScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/cart/:id' element={<CartScreen />} />
      <Route path='/' element={<HomeScreen />} exact />
      <Route path='/search' element={<HomeScreen />} />
      <Route path='/component' element={<ProductFilterScreen />} />
    </Routes>
  )
}

export default ProductOrderRoutes
