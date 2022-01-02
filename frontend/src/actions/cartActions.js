import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_FAIL,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image[0],
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
}

export const saveAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_ADDRESS,
    payload: data,
  })
}

export const savePaymentMethod = (data) => (dispatch) => {
  try {
    if (!data) throw new Error('Must Select payment Method')
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CART_SAVE_PAYMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
