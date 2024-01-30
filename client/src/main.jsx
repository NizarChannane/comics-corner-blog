import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from "./contexts/AuthContext";
import { StyledEngineProvider } from '@mui/material/styles';
import ScrollToTop from './helpers/ScrollToTop';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </StyledEngineProvider>
  // </React.StrictMode>,
)

