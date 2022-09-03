import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productReviewUpdateReducer,
  productTopRatedReducer,
  productListFilteredReducer,
} from './reducers/productReducers'
import { urlReducer } from './reducers/urlReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  myOrdersReducer,
  orderCreateReducer,
  orderDeliveryStatusReducer,
  orderDetailsReducer,
  orderListReducer,
} from './reducers/orderReducers'

const cartPersistConfig = {
  key: 'cart',
  storage,
  blacklist: ['error', 'paymentMethodSuccess'],
}

const userLoginPersistConfig = {
  key: 'userLogin',
  storage,
  whitelist: ['userInfo'],
}
const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewUpdate: productReviewUpdateReducer,
    productTopRated: productTopRatedReducer,
    productListFiltered: productListFilteredReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    url: urlReducer,
    userLogin: persistReducer(userLoginPersistConfig, userLoginReducer),
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrders: myOrdersReducer,
    orderList: orderListReducer,
    orderDeliveryStatus: orderDeliveryStatusReducer,
  },
})

const persistor = persistStore(store)

export { store, persistor }
