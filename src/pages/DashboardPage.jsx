import React, { useEffect, useState } from 'react'

import bed from '../assets/bed.svg'
import exit from '../assets/exit.svg'
import door from '../assets/door.svg'
import { useDispatch, useSelector } from 'react-redux'
import KPIs from '../components/KPIs'
import { fetchBookings, selectBookingsList } from '../slices/bookingsListSlice'
import styled from 'styled-components'

const DashboardContainer = styled.div`
  padding-right: 50px;
`
const DashboardPage = () => {
  const dispatch = useDispatch()
  const bookings = useSelector(selectBookingsList)
  const [items, setItems] = useState([])
  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch, bookings])
  useEffect(() => {
    const totalbookings = bookings.length
    const bookingsCheckin = bookings.filter(booking => booking.status === 'checkin')
    const bookingsCheckout = bookings.filter(booking => booking.status === 'checkout')
    setItems([
      { icon: bed, value: totalbookings, text: 'Total Bookings' },
      { icon: door, value: bookingsCheckin.length, text: 'Check In' },
      { icon: exit, value: bookingsCheckout.length, text: 'Check Out' }
    ])
  }, [bookings])
  return (
    <DashboardContainer>
      <KPIs items={items}/>
    </DashboardContainer>
  )
}

export default DashboardPage
