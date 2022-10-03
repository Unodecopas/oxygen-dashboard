import React, { useState } from 'react'

import styled from 'styled-components'
import Button from '../components/Button'
import { useUser } from '../context/userContext'

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

const EditUser = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [user, dispatch] = useUser()

  const handleForm = (e) => {
    e.preventDefault()
    setSuccess('')
    if (username === user.username) {
      setError('El username introducido es el mismo que el anterior')
      return
    }
    if (email === user.email) {
      setError('El email introducido es el mismo que el anterior')
      return
    }
    if (username && username !== user.username) dispatch({ type: 'changeUsername', value: username })
    if (email && email !== user.email) dispatch({ type: 'changeEmail', value: email })
    setEmail('')
    setError('')
    setUsername('')
    setSuccess('Datos cambiados con éxito')
  }
  const clearForm = (e) => {
    e.preventDefault()
    setEmail('')
    setError('')
    setUsername('')
  }
  return (
    <EditUserContainer>
      <h2>Hi! {user.username}</h2>
      <form onSubmit={handleForm} id='edit-user-form'>
        <label htmlFor="username">New username</label>
        <input type="text" name='username' value={username} onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="email">New Email</label>
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <div className='form-buttons'>
          <Button label={'Clear'} onClick={clearForm} id='clear-form'/>
          <Button label={'Save'} type='submit' id='submit-form' primary/>
        </div>
      </form>
      {error && <p className='login-error' onClick={() => setError('')}>{error}</p>}
      {success && <p className='login-success' onClick={() => setSuccess('')}>{success}</p>}
    </EditUserContainer>
  )
}

export default EditUser
