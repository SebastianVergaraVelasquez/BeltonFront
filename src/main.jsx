import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BeltonApp from './beltonApp.jsx'
import { AuthProvider } from './auth/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BeltonApp />
    </AuthProvider>
  </StrictMode>,
)
