import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { useUser } from '../context/userContext'

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
  & .user__info {
    margin-top:60px;
    display: flex;
    flex-direction:column;
    place-items:center;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 18px;
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
      color: #393939;
    }
    & p {
      font-size: 0.75rem;
      color: #B2B2B2;
    }
    & button {
      cursor: pointer;
      border-radius: 8px;
      border: none;
      padding: 14px 38px;
      background-color: #EBF1EF;
      color: #135846;
      margin-bottom: 37px;
      &:hover {
        background-color:#135846;
        color: white;
      }
    }
  }
  & footer {
    margin-top: 62px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
    & h3 {
      color: #212121;
      font-size: 1rem;
    }
    & p {
      color: #799283;
      font-size: 14px;
    }
  }
`
const Navbar = () => {
  const [user] = useUser()
  return (
    <Nav>
      <a href="https://unodecopas.github.io/oxygen-hotel-miranda/public/index.html">
        <img src={logo} alt="" width={220} height={57}/>
      </a>
      <ul>
        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        <li><NavLink to={'/rooms'}>Room</NavLink></li>
        <li><NavLink to={'/bookings'}>Bookings</NavLink></li>
        <li><NavLink to={'/users'}>Users</NavLink></li>
        <li><NavLink to={'/contact'}>Contact</NavLink></li>
      </ul>
      <div className='user__info'>
        <div className='user__info__img'></div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        <Link to={'users/edit'}>
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
