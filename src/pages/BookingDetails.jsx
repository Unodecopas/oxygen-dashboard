import React from 'react'
import { useParams } from 'react-router-dom'

const BookingDetails = () => {
  const { bookingid } = useParams()
  return (
    <div>BookingDetails {bookingid}</div>
  )
}

export default BookingDetails
