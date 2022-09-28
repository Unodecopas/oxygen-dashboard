import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import Pagination from '../components/Pagination'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'
import Table from '../components/Table'
import { selectUsersList } from '../slices/usersListSlice'

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
  
`
const ITEMS_PERPAGE = 10

const UserPage = () => {
  const [, setFilter] = useState('')
  const [page, setPage] = useState(0)
  const navigate = useNavigate()
  const users = useSelector(selectUsersList)

  const usersPagination = []

  for (let i = 0; i < users.length; i += ITEMS_PERPAGE) {
    const piece = users.slice(i, i + ITEMS_PERPAGE)
    usersPagination.push(piece)
  }
  const handleFilter = (filter) => {
    setFilter(filter)
  }

  const handleButton = () => {
    navigate('/user/newuser')
  }
  const handleUser = (userid) => {
    navigate(`/user/${userid}`)
  }
  return (
    <UsersContainer>
      <div className='switcher'>
        <Switcher
        items={[{ label: 'All Employee', value: '' }, { label: 'Active Employee', value: 'ACTIVE' }, { label: 'Inactive Employee', value: 'INACTIVE' }]}
        handleSwitcher={handleFilter}
        />
        <Button label={'+ New Employee'} onClick={handleButton} primary/>
        <Selector options={['Date', 'Name']}/>
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
            usersPagination && usersPagination[page].map(user => {
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
                  <td className={user.status}>{user.status.toUpperCase()}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <Pagination totalPages={usersPagination.length} actualPage={page} setPage={setPage} totalResults={users.length} itemsPerPage={ITEMS_PERPAGE}/>
    </UsersContainer>
  )
}

export default UserPage
