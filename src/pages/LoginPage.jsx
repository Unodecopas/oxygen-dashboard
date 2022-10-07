import styled from 'styled-components'
import React, { useState } from 'react'
import logo from '../assets/logo-sm.png'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const USER = {
  username: 'JesusGallardo',
  password: 'admin'
}
const Login = styled.div`
  height:100%;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  & .login__form {
    padding: 3.125rem 1rem;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    & > img {
      display:block;
      margin: auto;
      width: 100px;
      height:100px;
    }
    & h2 {
      text-align:center;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    & label {
      margin-top:1rem;
    }
    & input {
      min-width:280px;
      padding: .5rem .5rem;
      background-color: #f5f5f5;
      border: none;
      border-radius: 12px;
    }
    & button {
      background-color: #2a5747;
      color: white;
      margin-top: 1rem;
      border-radius: 12px;
      border:2px solid white;
      cursor:pointer;
      padding: .5rem .5rem;
      &:hover {
        background-color:white;
        color: #2a5747;
        border: 2px solid #2a5747;
      }
    }
  }
  & .login__error {
    color: red;
  }
`

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [, dispatch] = useUser()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (username === USER.username && password === USER.password) {
      dispatch({ type: 'login', value: { username, email: 'correo@correo.com', id: 1 } })
      navigate('/dashboard')
    } else {
      setError('Has introducido datos incorrectos')
    }
  }

  return (
    <Login>
      <form className='login__form' onSubmit={handleSubmit}>
        <img src={logo} alt="" />
        <h2>Login</h2>
        {error && <p className='login__error'>{error}</p>}
        <label htmlFor="username">Username</label>
        <input type="text" name='Username' value={username} placeholder={USER.username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name='Password' value={password} placeholder={USER.password} onChange={e => setPassword(e.target.value)} />
        <button id='form-login-button'>Login</button>
      </form>
    </Login>
  )
}

export default LoginPage
