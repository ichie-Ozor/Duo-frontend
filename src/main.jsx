import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import AppNavigation from "./routes/AppNavigation";
import { Toaster } from "react-hot-toast";
import { Provider } from "./app/auth/Context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <SidebarProvider>
          <AppNavigation />
          <Toaster position="top-center" />
        </SidebarProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
