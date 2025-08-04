import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';

// ✅ Enable cookies in every axios request
import axios from 'axios';
axios.defaults.withCredentials = true;   // <-- Must for cookies
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;  // <-- Add this for global backend URL

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
