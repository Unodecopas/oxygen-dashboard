import Table from '../../components/Table'
import Switcher from '../../components/Switcher'
import Switch from '../../components/Switch'
import styled from 'styled-components'
import Selector from '../../components/Selector'
import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings, selectBookingsList } from '../../slices/bookingsListSlice'
import orderState from '../../utils/orderState'
import { selectSearchTerm } from '../../slices/searchTermSlice'

const BookingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  const searchTerm = useSelector(selectSearchTerm)
  const [orderBy, setOrderBy] = useState('id')
  const [showBookings, setShowBookings] = useState([])

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch, fetchBookings])

  useEffect(() => {
    const filteredBookings = filter !== '' ? bookings.filter(booking => booking.status === filter) : bookings
    const searchFilteredBookings = filteredBookings.filter(booking => booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()))
    const orderedFilteredBookings = orderState(searchFilteredBookings, orderBy)
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
      <Switcher>
        <Switch
          items={[{ label: 'All Bookings', value: '' }, { label: 'Checking In', value: 'checkin' }, { label: 'Checking Out', value: 'checkout' }, { label: 'In Progress', value: 'inprogress' }]}
          handleSwitcher={handleFilter}
        />
        <Button label={'+ New Booking'} onClick={handleButton} primary/>
        <Selector options={[
          { label: 'Date', value: 'orderDate' },
          { label: 'Guest', value: 'guestName' }]} onChange={handleOrder}/>
      </Switcher>
      <Table>
        <thead>
          <tr>
            <th>Guess Name</th>
            <th>Order Date</th>
            <th>Check In</th>
            <th>Special Request</th>
            <th>Bed Type</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {showBookings && showBookings.map(booking => {
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
                <td>
                  <div className=''>
                  <p>{booking.checkin}</p>
                  {booking.checkout}
                  </div>
                </td>
                <td><Button label={'View Notes'} onClick={() => handleBooking(booking.id)}/></td>
                <td>{booking.roomType}</td>
                <td><p className={booking.status}>{booking.status.toUpperCase()}</p></td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
      <Pagination items={bookingsState} itemsPerPage={5} setItems={setShowBookings}/>
    </BookingsContainer>
  )
}

export default BookingsPage
