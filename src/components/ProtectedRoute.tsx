import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

interface Props {
  user: {
    logged: boolean,
    name: string,
    email: string,
    id: number
  }
}
const ProtectedRoute = ({ user }: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (user.logged === false) {
      navigate('/login')
    }
  }, [user])

  return <Outlet />
}

export default ProtectedRoute
