import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JorunalApp } from './JorunalApp'
import './assets'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <JorunalApp />
    </BrowserRouter>
  </StrictMode>,
)