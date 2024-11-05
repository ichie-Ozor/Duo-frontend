<<<<<<< HEAD
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
// import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import AppNavigation from "./routes/AppNavigation";
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './components/ui/sidebar'
import AppNavigation from './routes/AppNavigation'
import { Toaster } from 'react-hot-toast'
import { Provider } from './app/auth/Context'
>>>>>>> 79762a9e97b4f37642894f494129901e5852c34e

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
    <BrowserRouter>
      <SidebarProvider>
<<<<<<< HEAD
        {/* <App /> */}
        <AppNavigation />
      </SidebarProvider>
    </BrowserRouter>
=======
        <AppNavigation />
        <Toaster position="top-center" />
      </SidebarProvider>
    </BrowserRouter>
    </Provider>
>>>>>>> 79762a9e97b4f37642894f494129901e5852c34e
  </StrictMode>
);
