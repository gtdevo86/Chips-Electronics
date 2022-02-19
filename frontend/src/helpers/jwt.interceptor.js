import axios from 'axios'
import { store } from '../store'

export function jwtInterceptor() {
  axios.interceptors.request.use(
    (request) => {
      const userInfo = store.getState().userLogin.userInfo
      if (userInfo?.token && !isTokenExpired(userInfo?.token)) {
        request.headers.common.Authorization = `Bearer ${userInfo.token}`
        request.headers['Content-Type'] = 'application/json'
      }
      return request
    },
    (error) => {}
  )
}

function isTokenExpired(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  const data = JSON.parse(jsonPayload)
  const expirationDate = data.exp
  const currentDate = new Date().getTime() / 1000
  return currentDate >= expirationDate
}
