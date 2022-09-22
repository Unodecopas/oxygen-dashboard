import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import BookingsPage from './BookingsPage'
import ContactPage from './ContactPage'
import DashboardPage from './DashboardPage'
import UserPage from './UserPage'
import RoomsPage from './RoomsPage'

const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 345px 1fr;
  height:100%;
`
const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
`
const HomePage = () => {
  return (
    <HomePageContainer>
      <Navbar />
      <MainContainer>
        <Header />
        <main>
          <Routes>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/rooms' element={<RoomsPage />} />
            <Route path='/bookings' element={<BookingsPage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </main>
      </MainContainer>
    </HomePageContainer>
  )
}

export default HomePage
