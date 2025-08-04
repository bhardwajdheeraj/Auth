import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedin } = useContext(AppContent);
  const token = localStorage.getItem("token");

  if (isLoggedin && token) {
    return children; // ✅ Access granted
  } else {
    return <Navigate to="/login" />; // 🚫 Redirected
  }
};

export default PrivateRoute;
