import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated, getUser } from '../utils/auth'

// AdminRoute: ensures the user is authenticated and has role 'admin'.
export default function AdminRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/Login" state={{ redirectTo: location.pathname }} replace />;
  }
  const user = getUser();
  if (!user || user.role !== 'admin') {
    // Non-admins are redirected to home (could be a 403 page instead)
    return <Navigate to="/" replace />;
  }
  return children;
}
