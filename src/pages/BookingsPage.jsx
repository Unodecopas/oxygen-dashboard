import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from '../components/Button'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'
import Table from '../components/Table'
import { selectBookingsList } from '../slices/bookingsListSlice'

const BookingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 3.125rem;
  & .switcher {
    display: flex;
    width: 100%;
    & div {
      flex-grow: 1;
    }
    & button {
      margin-right: 1.25rem;
    }
  }
`

const ITEMS_PERPAGE = 10

const BookingsPage = () => {
  const [, setFilter] = useState('')
  const [page] = useState(0)
  const bookings = useSelector(selectBookingsList)

  const bookingsPagination = []

  for (let i = 0; i < bookings.length; i += ITEMS_PERPAGE) {
    const piece = bookings.slice(i, i + ITEMS_PERPAGE)
    bookingsPagination.push(piece)
  }

  const handleFilter = (filter) => {
    setFilter(filter)
  }
  return (
    <BookingsContainer>
      <div className='switcher'>
        <Switcher
          items={[{ label: 'All Bookings', value: '' }, { label: 'Checking In', value: 'checkin' }, { label: 'Checking Out', value: 'checkout' }, { label: 'In Progress', value: 'inprogress' }]}
          handleSwitcher={handleFilter}
        />
        <Button label={`${new Date().toLocaleString()}`} primary/>
        <Selector options={['Date', 'Name']}/>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Guess Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Special Request</th>
            <th>Bed Type</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {
            bookingsPagination && bookingsPagination[page].map(booking => {
              return (
                <tr key={booking.id}>
                  <td>
                    <div style={{ display: 'flex', placeItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <p>{booking.guestname}</p>
                        <p>{`#${booking.id}`}</p>
                        <p>{booking.orderDate}</p>
                      </div>
                    </div>
                  </td>
                  <td>{booking.checkin}</td>
                  <td>{booking.checkout}</td>
                  <td>{booking.request}</td>
                  <td>{booking.roomType}</td>
                  <td className={booking.status}>{booking.status.toUpperCase()}</td>
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
