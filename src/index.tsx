import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './custom.css'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './state'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
