import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.png'

const Nav = styled.nav`
  padding: 2rem 4.3125rem 0 1.625rem;
  box-shadow: 13px 3px 40px #00000005;
  background-color: white;
  height:100%;
  & img {
    margin-left:2rem;
  }
  & ul {
    margin-top: 5.3125rem;
    display:flex;
    flex-direction:column;
    gap:2rem;
  }
`
const Navbar = () => {
  return (
    <Nav>
      <img src={logo} alt="" width={220} height={57}/>
      <ul>
        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        <li><NavLink to={'/rooms'}>Room</NavLink></li>
        <li><NavLink to={'/bookings'}>Bookings</NavLink></li>
        <li><NavLink to={'/guest'}>Guest List</NavLink></li>
        <li><NavLink to={'/concierge'}>Concierge</NavLink></li>
      </ul>
    </Nav>
  )
}

export default Navbar
