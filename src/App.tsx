import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import styled from 'styled-components'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import UserPage from './pages/users/UserPage'
import NewUserPage from './pages/users/NewUserPage'
import UserDetails from './pages/users/UserDetails'
import EditUser from './pages/users/EditUser'
import RoomsPage from './pages/rooms/RoomsPage'
import NewRoomPage from './pages/rooms/NewRoomPage'
import RoomDetails from './pages/rooms/RoomDetails'
import BookingsPage from './pages/bookings/BookingsPage'
import BookingDetails from './pages/bookings/BookingDetails'
import NewBookingPage from './pages/bookings/NewBookingPage'
import ContactPage from './pages/contact/ContactPage'
import { useUser } from './context/userContext'
import ReviewDetails from './pages/contact/ReviewDetails'

const Dashboard = styled.div`
  width:100%;
  height:100%;
`

function App (): JSX.Element {
  const [user] = useUser()
  return (
    <Dashboard>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route element={<ProtectedRoute user={user} />}>
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
            <Route path='contact/:reviewid' element={<ReviewDetails />} />
          </Route>
        </Route>
      </Routes>
    </Dashboard>
  )
}

export default App
