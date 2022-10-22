import styled from 'styled-components'
import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height:100%;
  width: 100%;
`
const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  & main {
    background-color: ${props => props.theme.colors.bgSecondary};
  }
`
interface Props {
  changeTheme: () => void
}
const HomePage = ({ changeTheme }: Props): JSX.Element => {
  return (
    <HomePageContainer>
      <Navbar />
      <MainContainer>
        <Header changeTheme={changeTheme} />
        <main>
          <Outlet />
        </main>
      </MainContainer>
    </HomePageContainer>
  )
}

export default HomePage
