import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_UPDATE_REVIEW_REQUEST,
  PRODUCT_UPDATE_REVIEW_SUCCESS,
  PRODUCT_UPDATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_FILTER_FAIL,
} from '../constants/productConstants'

export const listProducts =
  (keyword = '', pageNumber = '', liveOnly = true) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const { data } = await axios.get(
        `/api/products/?keyword=${keyword}&pageNumber=${pageNumber}&liveOnly=${liveOnly}`
      )

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const filterProducts =
  (filters, pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_FILTER_REQUEST })
      const { data } = await axios.get(
        `/api/products/filter/?filters=${encodeURIComponent(
          JSON.stringify(filters)
        )}&pageNumber=${pageNumber}`
      )

      dispatch({
        type: PRODUCT_FILTER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_FILTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const listProductDetails =
  (id, optionalRoute = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST })

      const { data } = await axios.get(`/api/products/${id}/${optionalRoute}`)

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    await axios.delete(`/api/products/${id}`)

    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const { data } = await axios.post('/api/products/', product)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/products/${product._id}`, product)
    await axios.delete(`/api/products/${product._id}/purgeImages`)

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

      await axios.post(`/api/products/${productId}/review`, review)

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, success: true })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REVIEW_REQUEST })

      await axios.put(`/api/products/${productId}/review`, review)

      dispatch({ type: PRODUCT_UPDATE_REVIEW_SUCCESS, success: true })
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })
    const { data } = await axios.get('/api/products/top')

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
