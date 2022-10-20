import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import App from './App'
import './index.css'
import { UserProvider } from './context/userContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <BrowserRouter basename='/oxygen-dashboard'>
          <App />
        </BrowserRouter>
      </Provider>
    </UserProvider>
 </React.StrictMode>
)



