import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'

import App from './pages/Root'
import Characters from './pages/Characters'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/characters',
    element: <Characters />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root')!)

// this is if you want to mock your backend while developing (I think)
if (process.env.NODE_ENV === 'development' && false) {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    })
    .then(() => {
      root.render(
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      )
    })
} else {
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
