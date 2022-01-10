import { useLayoutEffect, useState } from 'react'
import { BrowserRouter, Router } from 'react-router-dom'

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <BrowserRouter
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

export default CustomRouter
