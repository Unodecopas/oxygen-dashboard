import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import styled from 'styled-components'
import DashboardPage from './pages/DashboardPage'
import RoomsPage from './pages/RoomsPage'
import BookingsPage from './pages/BookingsPage'
import ConciergePage from './pages/ConciergePage'
import GuestListPage from './pages/GuestPage'

const Dashboard = styled.div`
  width:100%;
  height:100%;
`

function App () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userMiranda')) || false)
  return (
    <Dashboard>
      <Routes>
        <Route path='login' element={<LoginPage setUser={setUser} />} />
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path='/' element={<HomePage />}>
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='guest' element={<GuestListPage />} />
            <Route path='rooms' element={<RoomsPage />} />
            <Route path='bookings' element={<BookingsPage />} />
            <Route path='concierge' element={<ConciergePage />} />
          </Route>
        </Route>
      </Routes>
    </Dashboard>
  )
}

export default App
