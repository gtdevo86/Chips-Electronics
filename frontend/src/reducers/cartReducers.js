import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_FAIL,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_PAYMENT_RESET,
  CLEAR_CART,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, billingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_SAVE_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload[0],
        billingAddress: action.payload[1],
      }
    case CART_SAVE_PAYMENT_RESET:
      return {
        ...state,
        paymentMethodSuccess: false,
        error: null,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
        paymentMethodSuccess: true,
      }
    case CART_SAVE_PAYMENT_FAIL:
      return { ...state, error: action.payload }
    case CLEAR_CART:
      return { ...state, cartItems: [], paymentMethodSuccess: false }
    default:
      return state
  }
}
