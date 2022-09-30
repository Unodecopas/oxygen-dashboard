import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import styled from 'styled-components'
import DashboardPage from './pages/DashboardPage'
import UserPage from './pages/UserPage'
import NewUserPage from './pages/NewUserPage'
import UserDetails from './pages/UserDetails'
import RoomsPage from './pages/RoomsPage'
import NewRoomPage from './pages/NewRoomPage'
import RoomDetails from './pages/RoomDetails'
import BookingsPage from './pages/BookingsPage'
import BookingDetails from './pages/BookingDetails'
import NewBookingPage from './pages/NewBookingPage'
import ContactPage from './pages/ContactPage'

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
          <Route path='/*' element={<HomePage setUser={setUser}/>}>
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='user' element={<UserPage />} />
            <Route path='user/newuser' element={<NewUserPage />} />
            <Route path='user/:userid' element={<UserDetails />} />
            <Route path='rooms' element={<RoomsPage />} />
            <Route path='rooms/newroom' element={<NewRoomPage />} />
            <Route path='rooms/:roomid' element={<RoomDetails />} />
            <Route path='bookings' element={<BookingsPage />} />
            <Route path='bookings/newbooking' element={<NewBookingPage />} />
            <Route path='bookings/:bookingid' element={<BookingDetails />} />
            <Route path='contact' element={<ContactPage />} />
          </Route>
        </Route>
      </Routes>
    </Dashboard>
  )
}

export default App
