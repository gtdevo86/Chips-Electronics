import { CHANGE_IN_URL } from '../constants/urlConstants'

export const urlReducer = (state = { pathname: '' }, action) => {
  switch (action.type) {
    case CHANGE_IN_URL:
      return {
        ...state,
        basePath: String(action.payload.pathname).split('/')[1],
        fullPath: String(action.payload.pathname).substring(1),
      }
    default:
      return state
  }
}
