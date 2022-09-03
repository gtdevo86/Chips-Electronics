import { Navigate } from 'react-router-dom'
import { isTokenExpired } from './jwt.interceptor'
const Protected = ({ protect, userInfo, adminRequired, children }) => {
  if (protect) {
    if (userInfo) {
      if (isTokenExpired(userInfo.token)) return <Navigate to='/logout' replace />
      if (adminRequired && !userInfo.isAdmin) return <Navigate to='/' replace />
      return children
    }
    return <Navigate to='/login' replace />
  }
  return children
}
export default Protected
