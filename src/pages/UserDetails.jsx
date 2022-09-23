import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const { userid } = useParams()
  return (
    <div>UserDetails {userid}</div>
  )
}

export default UserDetails
