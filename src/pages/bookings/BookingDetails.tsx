import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooking, selectBooking } from '../../slices/bookingsListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const BookingDetails = () => {
  const { bookingid } = useParams()
  const booking = useAppSelector(state => state.bookingsList.booking)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooking(Number(bookingid)))
  }, [dispatch, booking])

  return (
    <div>
      {
      Object.entries(booking).map((key, i) => {
        return <p key={i}>{key[0]} : {key[1]}</p>
      })}
    </div>
  )
}

export default BookingDetails
