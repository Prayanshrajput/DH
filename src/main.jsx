import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Statemanager from './objectway/Statemanager.jsx'
import {Provider} from 'react-redux'
import { store } from './app/store.js'
import Render from './objectway/Render.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <Statemanager ></Statemanager>
  </Provider>
 
)
