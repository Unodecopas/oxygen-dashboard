import React from 'react'
import { useParams } from 'react-router-dom'

const RoomDetails = () => {
  const { roomid } = useParams()
  return (
    <div>RoomDetails {roomid}</div>
  )
}

export default RoomDetails
