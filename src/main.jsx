import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CVProvider from './context/CVContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CVProvider>
    <App />
  </CVProvider>
)