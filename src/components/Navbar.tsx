import styled from 'styled-components'
import React from 'react'
import logo from '../assets/logo.png'
import { useUser } from '../context/userContext'
import { Link, NavLink } from 'react-router-dom'

const Nav = styled.nav`
  padding: 2rem 2rem 0 1.625rem;
  box-shadow: 13px 3px 40px #00000005;
  background-color: ${props => props.theme.colors.bgPrimary};
  color: ${props => props.theme.colors.primary};
  height:100%;
  display: flex;
  flex-direction: column;
  & img {
    margin-left:1rem;
  }
  & ul {
    margin-top: 4rem;
    display:flex;
    flex-direction:column;
    gap:2rem;
    & li {
      margin-left: 1rem;
      border-bottom: 1px solid transparent;
      transition:all 0.3s ease-out;
      &:hover{
        transform: translate(2px, -2px);
        color: red;
      }
    }
  }
  & .user__info {
    margin-top:1.5rem;
    display: flex;
    flex-direction:column;
    place-items:center;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 18px;
    background-color: ${props => props.theme.colors.bgSpecial};
    gap: 15px;
    &__img {
      background-color: #c5c5c5;
      width:70px;
      height:70px;
      border-radius:8px;
    }
    & h3 {
      text-align: center;
      font-size: 1rem;
      letter-spacing: 0px;
      color: ${props => props.theme.colors.primary};
    }
    & p {
      font-size: 0.75rem;
      color: ${props => props.theme.colors.secondary};
    }
    & button {
      border: 1px solid ${props => props.theme.colors.bgSpecial};
      border-radius: 8px;
      padding: 14px 38px;
      background-color: ${props => props.theme.button.bgPrimary};
      color: ${props => props.theme.button.primary};
      margin-bottom: 37px;
      transition: all 0.3s ease-out;
      &:hover {
        border: 1px solid ${props => props.theme.button.bgPrimary};
        background-color: ${props => props.theme.colors.bgSpecial};
        color: ${props => props.theme.button.secondary};
      }
    }
  }
  & footer {
    margin-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-grow: 1;
    justify-content: end;
    text-align: center;
    & h3 {
      color: ${props => props.theme.colors.primary};
      font-size: 1rem;
    }
    & p {
      color: #799283;
      font-size: 14px;
    }
  }
`
const Navbar = (): JSX.Element => {
  const [user] = useUser()

  return (
    <Nav>
      <a href='https://unodecopas.github.io/oxygen-hotel-miranda/public/index.html' target='blank'>
        <img src={logo} alt='' width={220} height={57} />
      </a>
      <ul>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/rooms'>Room</NavLink></li>
        <li><NavLink to='/bookings'>Bookings</NavLink></li>
        <li><NavLink to='/users'>Users</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
      </ul>
      <div className='user__info'>
        <div className='user__info__img' />
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        <Link to='users/edit'>
          <button id='btn-edit-profile'>Edit</button>
        </Link>
      </div>
      <footer>
        <h3>Travl Hotel Admin Dashboard</h3>
        <p>&copy; 2020 All Rights Reserved</p>
      </footer>
    </Nav>
  )
}

export default Navbar
