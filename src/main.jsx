import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { attachTokenFromStorage } from './utils/auth'
// initialize axios (sets baseURL + withCredentials + interceptor)
import './utils/api'

// Attach token to axios headers if present
attachTokenFromStorage();

createRoot(document.getElementById('root')).render(
   < BrowserRouter>
   <App/>
  </BrowserRouter>

)