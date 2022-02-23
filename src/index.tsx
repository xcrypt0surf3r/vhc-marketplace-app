import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './custom.css'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './state'
import { isDev } from './utils'

const prod = {
  id: process.env.REACT_APP_COMMIT
}

const dev = {
  build: {
    env: process.env.REACT_APP_ENV,
    deploy: process.env.REACT_APP_DEPLOY_ID,
    branch: process.env.REACT_APP_BRANCH,
    commitUrl: `https://github.com/Vault-Hill/vhc-marketplace-app/commit/${process.env.REACT_APP_COMMIT}`
  }
}

// eslint-disable-next-line
const w = window as any

w.vh = {
  ...(isDev() ? dev : prod)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
