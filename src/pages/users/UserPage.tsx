import React, { useState, useEffect, FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button'
import Selector from '../../components/Selector'
import Switcher from '../../components/Switcher'
import Switch from '../../components/Switch'
import Table from '../../components/Table'
import { fetchUsers, selectUsersList, User } from '../../slices/usersListSlice'
import Pagination from '../../components/Pagination'
import orderState from '../../utils/orderState'
import { selectSearchTerm } from '../../slices/searchTermSlice'
import { useAppDispatch } from '../../hooks'

const UsersContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const UserPage: FC = () => {
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()
  const users = useSelector(selectUsersList)
  const dispatch = useAppDispatch()
  const [usersState, setUsersState] = useState<User[]>([])
  const searchTerm = useSelector(selectSearchTerm)
  const [orderBy, setOrderBy] = useState('id')
  const [usersToShow, setUsersToShow] = useState<User[]>([])

  useEffect(() => {
    dispatch(fetchUsers()).catch(Error)
  }, [dispatch, fetchUsers])

  useEffect(() => {
    const filteredUsers = filter !== '' ? users.filter(user => user.status === filter) : users
    const searchFilteredUsers = filteredUsers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    const orderedFilteredUsers = orderState(searchFilteredUsers, orderBy)
    setUsersState(orderedFilteredUsers)
  }, [users, orderBy, searchTerm, filter])

  const handleFilter = (filter: string): void => {
    setFilter(filter)
  }

  const handleButton = (): void => {
    navigate('/users/newuser')
  }
  const handleUser = (userid: number): void => {
    navigate(`/users/${userid}`)
  }
  const handleOrder = (value: string): void => {
    setOrderBy(value)
  }
  return (
    <UsersContainer>
      <Switcher>
        <>
          <Switch
            items={[{ label: 'All Employee', value: '' }, { label: 'Active Employee', value: 'active' }, { label: 'Inactive Employee', value: 'inactive' }]}
            handleSwitcher={handleFilter}
          />
          <Button label='+ New Employee' onClick={handleButton} primary />
          <Selector
            options={[
              { label: 'ID', value: 'id' },
              { label: 'User', value: 'username' }
            ]} onChange={handleOrder}
          />
        </>
      </Switcher>
      <Table>
        <>
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
              usersToShow?.map(user => {
                return (
                  <tr key={user.id} onClick={() => handleUser(user.id)}>
                    <td>
                      <div style={{ display: 'flex', placeItems: 'center' }}>
                        <img src={user.photo} alt='' />
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
        </>
      </Table>
      <Pagination items={usersState} itemsPerPage={4} setItems={setUsersToShow} />
    </UsersContainer>
  )
}

export default UserPage
