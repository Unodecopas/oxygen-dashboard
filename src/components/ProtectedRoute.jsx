import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ user }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (user.logged === false) {
      navigate('/login')
    }
  }, [user])

  return <Outlet />
}

export default ProtectedRoute
