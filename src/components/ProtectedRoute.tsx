import React from 'react'
import { Navigate } from 'react-router-dom'
import { getAuth } from '../utils/auth'
import { JSX } from 'react/jsx-runtime'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = getAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
