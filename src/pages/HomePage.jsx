import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

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
        <Header/>
        <main>
          <Outlet />
        </main>
      </MainContainer>
    </HomePageContainer>
  )
}

export default HomePage
