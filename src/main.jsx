import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import AuthContext from './context/authContext.jsx'
import APIContextProvider from "./context/apiContext.jsx";
import AuthContextProvider from './components/Authentication/Auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthContextProvider>
        <APIContextProvider>
          <App />
         </APIContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
)
