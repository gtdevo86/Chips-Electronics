import React from 'react'
import CartScreen from '../screens/checkout/CartScreen'
import PlaceOrderScreen from '../screens/checkout/PlaceOrderScreen'
import HomeScreen from '../screens/product/HomeScreen'
import ProductScreen from '../screens/product/ProductScreen'
import ViewOrderScreen from '../screens/user/ViewOrderScreen'
import ProductFilterScreen from '../screens/product/ProductFilterScreen'

const ProductOrderRoutes = [
  {
    path: '/order/:id',
    element: <ViewOrderScreen />,
  },
  {
    path: '/placeOrder',
    element: <PlaceOrderScreen />,
  },
  {
    path: '/product/:id',
    element: <ProductScreen />,
  },
  {
    path: '/cart',
    element: <CartScreen />,
  },
  {
    path: '/cart/:id',
    element: <CartScreen />,
  },
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/search',
    element: <HomeScreen />,
  },
  {
    path: '/component',
    element: <ProductFilterScreen />,
  },
]

export default ProductOrderRoutes
