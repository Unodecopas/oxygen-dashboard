import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import styled from 'styled-components'

const LOCAL_USER = 'userMiranda'
const Dashboard = styled.div`
  width:100%;
  height:100%;
`

function App () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_USER)) || { username: '', password: '', logged: false })

  useEffect(() => {
    localStorage.setItem(LOCAL_USER, JSON.stringify(user))
  }, [user])

  return (
    <Dashboard>
      <Routes>
        <Route path='login' element={<LoginPage setUser={setUser} />} />
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path='/*' element={<HomePage />} />
        </Route>
      </Routes>
    </Dashboard>
  )
}

export default App
