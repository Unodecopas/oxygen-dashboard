import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'
import Table from '../components/Table'
import { fetchUsers, selectUsersList } from '../slices/usersListSlice'

const UsersContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-right: 3.125rem;
  & .switcher {
    display: flex;
    width: 100%;
    padding: 10px 0;
    place-items: center;
    & div {
      flex-grow: 1;
    }
    & button {
      margin-right: 1.25rem;
      height: fit-content;
    }
    & select {
      height: fit-content;
    }
  }
  & table {
    & tbody {
      & td {
        cursor: pointer;
      }
    }
    & .active {
    color: #135846;
    background-color: #a2f3def6;
    padding: 0.5rem;
    border-radius: 12px;

  }
  & .inactive {
    padding: 0.5rem;
    border-radius: 12px;
    color: #721c24;
    background-color: #f8d7da;
  }
  }
  
`

const UserPage = () => {
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()
  const users = useSelector(selectUsersList)
  const dispatch = useDispatch()
  const [usersState, setUsersState] = useState([])
  const [searchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('id')

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, fetchUsers])

  useEffect(() => {
    const filteredUsers = filter !== '' ? users.filter(user => user.status === filter) : users
    const orderedFilteredUsers = filteredUsers.filter(user => user.username.includes(searchTerm))
    orderedFilteredUsers.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) {
        return 1
      } else if (a[orderBy] < b[orderBy]) {
        return -1
      }
      return 0
    })
    setUsersState(orderedFilteredUsers)
  }, [users, orderBy, searchTerm, filter])

  const handleFilter = (filter) => {
    setFilter(filter)
  }

  const handleButton = () => {
    navigate('/users/newuser')
  }
  const handleUser = (userid) => {
    navigate(`/users/${userid}`)
  }
  const handleOrder = (value) => {
    setOrderBy(value)
  }
  return (
    <UsersContainer>
      <div className='switcher'>
        <Switcher
        items={[{ label: 'All Employee', value: '' }, { label: 'Active Employee', value: 'active' }, { label: 'Inactive Employee', value: 'inactive' }]}
        handleSwitcher={handleFilter}
        />
        <Button label={'+ New Employee'} onClick={handleButton} primary/>
        <Selector options={['id', 'username']} onChange={handleOrder}/>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Description</th>
            <th>Contact</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
          {
            usersState && usersState.map(user => {
              return (
                <tr key={user.id} onClick={() => handleUser(user.id)}>
                  <td>
                    <div style={{ display: 'flex', placeItems: 'center' }}>
                      <img src={user.photo} alt="" />
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <p>{user.username}</p>
                        <p>{`#${user.id}`}</p>
                        <p>{user.startDate}</p>
                      </div>
                    </div>
                  </td>
                  <td>{user.job}</td>
                  <td>{user.contact}</td>
                  <td><p className={user.status}>{user.status.toUpperCase()}</p></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </UsersContainer>
  )
}

export default UserPage
