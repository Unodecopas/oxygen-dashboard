import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBooking, selectBooking } from '../slices/bookingsListSlice'

const BookingDetails = () => {
  const { bookingid } = useParams()
  const booking = useSelector(selectBooking)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooking(bookingid))
  }, [dispatch, booking])

  return (
    <div>BookingDetails {bookingid}</div>
  )
}

export default BookingDetails
