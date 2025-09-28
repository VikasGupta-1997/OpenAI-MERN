import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@src/context/AuthContext.tsx'
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.withCredentials = true;


const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: "Alan Sans, sans-serif",
    allVariants: { color: "white" },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
