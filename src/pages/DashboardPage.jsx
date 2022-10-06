import React, { useEffect, useState } from 'react'

import bed from '../assets/bed.svg'
import exit from '../assets/exit.svg'
import door from '../assets/door.svg'
import { useDispatch, useSelector } from 'react-redux'
import KPIs from '../components/KPIs'
import { fetchBookings, selectBookingsList } from '../slices/bookingsListSlice'
import styled from 'styled-components'
import { selectRoomsList } from '../slices/roomsListSlice'

const DashboardContainer = styled.div`

`
const DashboardPage = () => {
  const dispatch = useDispatch()
  const bookings = useSelector(selectBookingsList)
  const rooms = useSelector(selectRoomsList)
  const [items, setItems] = useState([])
  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch, bookings])
  useEffect(() => {
    const totalbookings = bookings.length
    const bookingsCheckin = bookings.filter(booking => booking.status === 'checkin')
    const percentOccupedRooms = rooms.length * bookingsCheckin.length / 100 + '%'
    const bookingsCheckout = bookings.filter(booking => booking.status === 'checkout')
    setItems([
      { icon: bed, value: totalbookings, text: 'New Bookings' },
      { icon: bed, value: percentOccupedRooms, text: 'Occupped Rooms' },
      { icon: door, value: bookingsCheckin.length, text: 'Check In' },
      { icon: exit, value: bookingsCheckout.length, text: 'Check Out' }
    ])
  }, [bookings, rooms])
  return (
    <DashboardContainer>
      <KPIs items={items}/>
    </DashboardContainer>
  )
}

export default DashboardPage
