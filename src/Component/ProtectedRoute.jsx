import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

// ProtectedRoute: guards routes that require authentication.
// If unauthenticated, redirect to /login and preserve `state.redirectTo` for post-login navigation.
export default function ProtectedRoute({ children }) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/Login" state={{ redirectTo: location.pathname }} replace />
  }
  return children
}
