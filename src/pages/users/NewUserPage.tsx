import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { newUser, UserStatus } from '../../slices/usersListSlice'

const UserContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & h2 {
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid grey;
  }
  & form {
    display: flex;
    flex-direction: column;
    place-items: center;
    & label {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(2,1fr);
    }
    & input {
      margin-bottom: 1rem;
      border: none;
      border-bottom: 1px solid grey;
      outline: none;
    }
    & input[type="date"]{
      margin-left: 2.2rem;
    }
    & .buttons {
      margin-top: 2rem;
      display: flex;
      gap: 2rem;
      width: 100%;
      place-items: center;
      justify-content: center;
    }
  }
`

const NewUserPage: FC = () => {
  const users = useAppSelector(state => state.usersList.users)
  const dispatch = useAppDispatch()
  const [id, setId] = useState(0)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [startDate, setStartDate] = useState('')
  const [job, setJob] = useState('')
  const [contact, setContact] = useState('')
  const photo = 'http://dummyimage.com/233x100.png/dddddd/000000'
  const [status, setStatus] = useState<UserStatus>(UserStatus.active)

  useEffect(() => {
    const lastUser = users.length + 1
    setId(lastUser)
  }, [users])

  const clearForm = (e: React.FormEvent): void => {
    e.preventDefault()
    setUsername('')
    setEmail('')
    setStartDate('')
    setJob('')
    setContact('')
    setStatus(UserStatus.inactive)
  }
  const handleForm = (e: React.FormEvent): void => {
    e.preventDefault()
    dispatch(newUser({ id, username, email, startDate, job, contact, status, photo })).catch(Error)
    setUsername('')
    setEmail('')
    setStartDate('')
    setJob('')
    setContact('')
    setStatus(UserStatus.inactive)
  }
  return (
    <UserContainer>
      <h2>Register new Employee</h2>
      <form>
        <label htmlFor='id'>
          <p>ID:</p>
          <input type='text' disabled value={id} />
        </label>
        <label htmlFor='username'>Username:
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label htmlFor='email'>
          <p>Email:</p>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label htmlFor='startDate'>
          <p>Start Date:</p>
          <input type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label htmlFor='job'>
          <p>Job:</p>
          <input type='text' value={job} onChange={e => setJob(e.target.value)} />
        </label>
        <label htmlFor='contact'>
          <p>Phone:</p>
          <input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='111-222-3333' name='contact' value={contact} onChange={e => setContact(e.target.value)} />
        </label>
        <label htmlFor='status'>status:
          <select name='status' defaultValue={status} id='status' onChange={e => setStatus(e.target.value as UserStatus)}>
            <option value={UserStatus.active}>Active</option>
            <option value={UserStatus.inactive}>Inactive</option>
          </select>
        </label>
        <div className='buttons'>
          <Button label='Clear' onClick={clearForm} />
          <Button label='Register' primary onClick={handleForm} />
        </div>
      </form>
    </UserContainer>
  )
}

export default NewUserPage
