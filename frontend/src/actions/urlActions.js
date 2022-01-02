import { CHANGE_IN_URL } from '../constants/urlConstants'

export const changeInUrl = (url) => (dispatch) => {
  dispatch({
    type: CHANGE_IN_URL,
    payload: url,
  })
}
