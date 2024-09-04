import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/Auth.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>,
    </AuthProvider>
)
