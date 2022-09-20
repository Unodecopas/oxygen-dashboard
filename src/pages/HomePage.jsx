import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 354px 1fr;
  height:100%;
`
const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
`
const HomePage = ({ children }) => {
  return (
    <HomePageContainer>
      <Navbar />
      <MainContainer>
        <Header />
        <main>
          {children}
        </main>
      </MainContainer>
    </HomePageContainer>
  )
}

export default HomePage
