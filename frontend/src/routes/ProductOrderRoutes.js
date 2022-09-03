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
    protected: true,
    adminRequired: false,
  },
  {
    path: '/placeOrder',
    element: <PlaceOrderScreen />,
    protected: true,
    adminRequired: false,
  },
  {
    path: '/product/:id',
    element: <ProductScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/cart',
    element: <CartScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/cart/:id',
    element: <CartScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/',
    element: <HomeScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/search',
    element: <HomeScreen />,
    protected: false,
    adminRequired: false,
  },
  {
    path: '/component',
    element: <ProductFilterScreen />,
    protected: false,
    adminRequired: false,
  },
]

export default ProductOrderRoutes
