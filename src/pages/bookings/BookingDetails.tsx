/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBooking } from '../../slices/bookingsListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import styled from 'styled-components'

const BookingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.bgPrimary};
  color: ${props => props.theme.colors.primary};
  & .booking__info{
    display: flex;
    flex-direction: column;
    &__title {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
   & .checkin {
    color: #135846;
    background-color: #a2f3def6;
    padding: 0.5rem;
    border-radius: 12px;
  }
  & .checkout {
    padding: 0.5rem;
    border-radius: 12px;
    color: #721c24;
    background-color: #f8d7da;
  }
  & .inprogress {
    padding: 0.5rem;
    color: #ecc32d;
    border-radius: 12px;
    background-color: #fff3cd;
  }
`
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
    <BookingContainer>
      {(booking != null)
        ? <div className='booking__info'>
          <div className='booking__info__title'>
            <h3>{booking.id}</h3>
            <h3>{booking.guestName}</h3>
            <h3>{booking.roomType}</h3>
            <p className={booking.status}>{booking.status.toUpperCase()}</p>
          </div>
          <div className='booking__info__data'>
            <p>Order Date: {booking.orderDate}</p>
            <p>Checkin: {booking.checkin}</p>
            <p>Checkout: {booking.checkout}</p>
          </div>
          <p>{booking.request}</p>
        </div>
        : <p>Nothing selected</p>}
    </BookingContainer>
  )
}

export default BookingDetails
