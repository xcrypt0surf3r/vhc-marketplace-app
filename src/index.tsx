import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import App from './App'
import './index.css'
import { setupStore } from './state'
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

function getLibrary(provider?: any) {
  return new Web3Provider(provider)
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </Web3ReactProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
