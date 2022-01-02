import {
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_RESET,
  MY_ORDERS_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERY_STATUS_FAIL,
  ORDER_DELIVERY_STATUS_REQUEST,
  ORDER_DELIVERY_STATUS_RESET,
  ORDER_DELIVERY_STATUS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_RESET:
      return { error: null, success: false }
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = {
    loading: true,
    orderItems: [],
    shippingAddress: {},
    billingAddress: {},
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_RESET:
      return { loading: true }
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_RESET:
      return { orders: [] }
    case MY_ORDERS_REQUEST:
      return { loading: true }
    case MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }
    case MY_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_RESET:
      return { orders: [] }
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDeliveryStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERY_STATUS_RESET:
      return {}
    case ORDER_DELIVERY_STATUS_REQUEST:
      return { loading: true }
    case ORDER_DELIVERY_STATUS_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELIVERY_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
