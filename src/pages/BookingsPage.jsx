import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'

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
const BookingsPage = () => {
  const [, setFilter] = useState('')
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
        <Button label={`${new Date().toLocaleString()}`}/>
        <Selector options={['Date', 'Name']}/>
      </div>
    </BookingsContainer>
  )
}

export default BookingsPage
