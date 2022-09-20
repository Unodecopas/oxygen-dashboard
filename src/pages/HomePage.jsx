import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import BookingsPage from './BookingsPage'
import ConciergePage from './ConciergePage'
import DashboardPage from './DashboardPage'
import GuestPage from './GuestPage'
import RoomsPage from './RoomsPage'
const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 354px 1fr;
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
            <Route path='/guest' element={<GuestPage />} />
            <Route path='/rooms' element={<RoomsPage />} />
            <Route path='/bookings' element={<BookingsPage />} />
            <Route path='/concierge' element={<ConciergePage />} />
          </Routes>
        </main>
      </MainContainer>
    </HomePageContainer>
  )
}

export default HomePage
