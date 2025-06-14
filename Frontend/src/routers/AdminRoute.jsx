import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
