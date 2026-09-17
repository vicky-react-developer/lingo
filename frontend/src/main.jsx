import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import axios from "axios";
import { userLogout } from './services/authService.js';

axios.interceptors.request.use(
  (config) => {
    // Get token from storage (adjust as needed)
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function onFulfilled(response) {
  return response;
}, function onRejected(error) {
  if (error.response?.status === 401) {
    userLogout();
    window.location.href = "/login";
  }
  return Promise.reject(error);
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
