import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ logged, children }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!logged) {
      navigate('/login')
    }
  }, [logged])

  return <Outlet />
}

export default ProtectedRoute
