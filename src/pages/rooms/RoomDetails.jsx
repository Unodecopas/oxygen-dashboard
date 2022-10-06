import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchRoom, selectRoom } from '../../slices/roomsListSlice'

const RoomDetails = () => {
  const { roomid } = useParams()
  const room = useSelector(selectRoom)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRoom(roomid))
  }, [dispatch, room])
  return (
    <div>
      {
      Object.entries(room).map((key, i) => {
        return (
          <p key={i}>{key[0]} : {key[1]}</p>
        )
      })
      }
    </div>
  )
}

export default RoomDetails
