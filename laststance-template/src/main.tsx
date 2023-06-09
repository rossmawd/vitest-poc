import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// this is if you want to mock your backend while developing (I think)
if (process.env.NODE_ENV === 'development' && false) {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    })
    .then(() => {
      root.render(<App />)
    })
} else {
  root.render(<App />)
}
