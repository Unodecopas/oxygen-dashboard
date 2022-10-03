import React from 'react'
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
import { useUser } from './context/userContext'
import EditUser from './pages/EditUser'

const Dashboard = styled.div`
  width:100%;
  height:100%;
`

function App () {
  const [user] = useUser()
  return (
    <Dashboard>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path='/*' element={<HomePage />}>
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='users' element={<UserPage />} />
            <Route path='users/newuser' element={<NewUserPage />} />
            <Route path='users/:userid' element={<UserDetails />} />
            <Route path='users/edit' element={<EditUser />} />
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
