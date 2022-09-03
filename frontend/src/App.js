import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import ProductOrderRoutes from './routes/ProductOrderRoutes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from './helpers/Protected'

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('white')
  const { fullPath } = useSelector((state) => state.url)
  var routesArray = AdminRoutes.concat(ProductOrderRoutes).concat(UserRoutes)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const whiteRegexArray = useMemo(
    () => [
      'login',
      'product\\/',
      'register',
      'profile',
      'userlist',
      'productlist',
      'orderlist',
      'productlist',
    ],
    []
  )

  useEffect(() => {
    if (String(fullPath).match('admin/product/')) {
      setBackgroundColor('#f8f9fa')
    } else if (
      whiteRegexArray.filter((regex) => String(fullPath).match(regex)).length >= 1
    )
      setBackgroundColor('white')
    else setBackgroundColor('#f8f9fa')
  }, [fullPath, whiteRegexArray])

  return (
    <BrowserRouter>
      <Header />
      <div style={{ background: backgroundColor }}>
        <main className='py-3'>
          <Container>
            <Routes>
              {routesArray.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <Protected
                      protect={route.protected}
                      userInfo={userInfo}
                      adminRequired={route.adminRequired}
                    >
                      {route.element}
                    </Protected>
                  }
                />
              ))}
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
