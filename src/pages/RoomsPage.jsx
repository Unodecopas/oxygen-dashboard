import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'

const RoomsContainer = styled.div`
  display:flex;
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

const RoomsPage = () => {
  const [, setFilter] = useState('')
  const handleFilter = (filter) => {
    setFilter(filter)
  }
  return (
    <RoomsContainer>
      <div className='switcher'>
        <Switcher
        items={[{ label: 'All Rooms', value: '' }, { label: 'Avalaible Rooms', value: 'avalaible' }, { label: 'Booked Rooms', value: 'booked' }]}
        handleSwitcher={handleFilter}
        />
        <Button label={'+ New Room'}/>
        <Selector options={['Number', 'Status', 'Price']}/>
      </div>
    </RoomsContainer>
  )
}

export default RoomsPage
