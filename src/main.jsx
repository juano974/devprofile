import ReactDOM from 'react-dom/client'
import App from './App'
import CVProvider from './context/CVContext'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CVProvider>
    <App />
  </CVProvider>
)