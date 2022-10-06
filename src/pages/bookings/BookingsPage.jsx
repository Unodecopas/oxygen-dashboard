import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button'
import Selector from '../../components/Selector'
import Switcher from '../../components/Switcher'
import Table from '../../components/Table'
import { fetchBookings, selectBookingsList } from '../../slices/bookingsListSlice'

const BookingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 3.125rem;
  & .switcher {
    display: flex;
    width: 100%;
    padding: 10px 0;

    & div {
      flex-grow: 1;
    }
    & button {
      margin-right: 1.25rem;
    }
  }
  & table {
    & button {
      background-color: white;
      color: grey;
      border: 1px solid grey;
      &:hover  {
        color: white;
        background-color: grey;
        border: 1px solid grey;
      }
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

const BookingsPage = () => {
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()
  const bookings = useSelector(selectBookingsList)
  const dispatch = useDispatch()
  const [bookingsState, setBookingsState] = useState([])
  const [searchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('id')

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch, fetchBookings])

  useEffect(() => {
    const filteredBookings = filter !== '' ? bookings.filter(booking => booking.status === filter) : bookings
    const orderedFilteredBookings = filteredBookings.filter(booking => booking.guestName.includes(searchTerm))
    orderedFilteredBookings.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) {
        return 1
      } else if (a[orderBy] < b[orderBy]) {
        return -1
      }
      return 0
    })
    setBookingsState(orderedFilteredBookings)
  }, [bookings, orderBy, searchTerm, filter])

  const handleFilter = (filter) => {
    setFilter(filter)
  }
  const handleBooking = (bookingid) => {
    navigate(`/bookings/${bookingid}`)
  }
  const handleOrder = (value) => {
    setOrderBy(value)
  }
  const handleButton = () => {
    navigate('/bookings/newbooking')
  }
  return (
    <BookingsContainer>
      <div className='switcher'>
        <Switcher
          items={[{ label: 'All Bookings', value: '' }, { label: 'Checking In', value: 'checkin' }, { label: 'Checking Out', value: 'checkout' }, { label: 'In Progress', value: 'inprogress' }]}
          handleSwitcher={handleFilter}
        />
        <Button label={'+ New Booking'} onClick={handleButton} primary/>
        <Selector options={['orderDate', 'guestName']} onChange={handleOrder}/>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Guess Name</th>
            <th>Order Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Special Request</th>
            <th>Bed Type</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {
            bookingsState && bookingsState.map(booking => {
              return (
                <tr key={booking.id} >
                  <td>
                    <div style={{ display: 'flex', placeItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <p>{booking.guestName}</p>
                      </div>
                    </div>
                  </td>
                  <td>{booking.orderDate}</td>
                  <td>{booking.checkin}</td>
                  <td>{booking.checkout}</td>
                  <td><Button label={'View Notes'} onClick={() => handleBooking(booking.id)}/></td>
                  <td>{booking.roomType}</td>
                  <td><p className={booking.status}>{booking.status.toUpperCase()}</p></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </BookingsContainer>
  )
}

export default BookingsPage
