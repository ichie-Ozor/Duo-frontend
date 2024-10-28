import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './components/ui/sidebar'
import AppNavigation from './routes/AppNavigation'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
      {/* <App /> */}
       <AppNavigation />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
