import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo-sm.png'
const USER = {
  email: 'admin@hotelmiranda.com',
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

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('admin@hotelmiranda.com')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = e => {
    e.preventDefault()
    if (username === USER.email && password === USER.password) {
      setUser(true)
      localStorage.setItem('userMiranda', JSON.parse(true))
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
        <input type="text" value={username} placeholder={USER.email} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} placeholder={USER.password} onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </Login>
  )
}

export default LoginPage
