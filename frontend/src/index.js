import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { jwtInterceptor } from './helpers/jwt.interceptor'
import { PersistGate } from 'redux-persist/integration/react'
import { createRoot } from 'react-dom/client'

jwtInterceptor()

const root = createRoot(document.getElementById('root'))
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  //</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
