import React, { FC, useState } from 'react'

import styled from 'styled-components'
import Button from '../../components/Button'
import { useUser } from '../../context/userContext'

const EditUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  & form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    place-items: center;
    & .form-buttons{
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      
    }
  }
  & .login-error {
    cursor: pointer;
    text-align: center;
    display: block;
    margin: auto;
    width: fit-content;
    color: #721c24;
    background-color: #f8d7da;
    padding: .5rem 1rem;
    margin-top: 1rem;
    border-radius: 12px;
  }
  & .login-success {
    cursor: pointer;
    text-align: center;
    display: block;
    margin: auto;
    padding: .5rem 1rem;
    margin-top: 1rem;
    border-radius: 12px;
    color: #135846;
    background-color: #a2f3def6;
  }
`

const EditUser: FC = () => {
  const [user, dispatch] = useUser()
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleForm = (e: React.FormEvent): void => {
    e.preventDefault()
    setSuccess('')
    if (username !== user.username) dispatch({ type: 'changeUsername', value: username })
    if (email !== user.email) dispatch({ type: 'changeEmail', value: email })
    showMessage('success', 'Datos cambiados con éxito')
    setError('')
  }
  const clearForm = (e: React.FormEvent): void => {
    e.preventDefault()
    setEmail('')
    setError('')
    setUsername('')
  }
  const showMessage = (type: string, message: string): void => {
    type === 'error' && setError(message)
    type === 'success' && setSuccess(message)
    setTimeout(() => {
      type === 'error' && setError('')
      type === 'success' && setSuccess('')
    }, 3000)
  }
  return (
    <EditUserContainer>
      <h2>Hi! {user.username}</h2>
      <form onSubmit={handleForm} id='edit-user-form'>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
        <div className='form-buttons'>
          <Button label='Clear' onClick={clearForm} id='clear-form' />
          <Button label='Save' id='submit-form' primary />
        </div>
      </form>
      {(error.length !== 0) && <p className='login-error' onClick={() => setError('')}>{error}</p>}
      {(success.length !== 0) && <p className='login-success' onClick={() => setSuccess('')}>{success}</p>}
    </EditUserContainer>
  )
}

export default EditUser
