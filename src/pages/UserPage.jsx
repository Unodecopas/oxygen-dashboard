import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'

const UsersContainer = styled.div`
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
const UserPage = () => {
  const [, setFilter] = useState('')
  const handleFilter = (filter) => {
    setFilter(filter)
  }
  return (
    <UsersContainer>
      <div className='switcher'>
        <Switcher
        items={[{ label: 'All Employee', value: '' }, { label: 'Active Employee', value: 'ACTIVE' }, { label: 'Inactive Employee', value: 'INACTIVE' }]}
        handleSwitcher={handleFilter}
        />
        <Button label={'+ New Employee'}/>
        <Selector options={['Date', 'Name']}/>
      </div>
    </UsersContainer>
  )
}

export default UserPage
