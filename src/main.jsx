import { AuthProvider } from './context/AuthContext.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client"
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider> 
    <BrowserRouter>
      <AuthProvider>
       <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);