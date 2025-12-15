import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/IRC_frontend'>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  registerSW();
}
