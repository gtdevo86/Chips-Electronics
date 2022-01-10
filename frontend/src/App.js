import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import CustomRouter from './helpers/CustomRouter'
import history from './helpers/customHistory'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import ProductOrderRoutes from './routes/ProductOrderRoutes'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('white')
  const { fullPath } = useSelector((state) => state.url)
  var routesArray = AdminRoutes.concat(ProductOrderRoutes).concat(UserRoutes)

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
    <CustomRouter history={history}>
      <Header />
      <div style={{ background: backgroundColor }}>
        <main className='py-3'>
          <Container>
            <Routes>
              {routesArray.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </CustomRouter>
  )
}

export default App
