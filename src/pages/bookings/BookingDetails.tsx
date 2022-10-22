import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBooking } from '../../slices/bookingsListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const BookingDetails = (): JSX.Element => {
  const { bookingid } = useParams()
  const booking = useAppSelector(state => state.bookingsList.booking)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchBooking(Number(bookingid))
    ).catch(Error)
  }, [dispatch, booking])

  return (
    <div>
      Booking details
    </div>
  )
}

export default BookingDetails
