import styled from 'styled-components'
import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 345px 1fr;
  height:100%;
  width: 100%;
`
const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
