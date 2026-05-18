/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\main.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

