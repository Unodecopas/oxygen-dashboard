import React from 'react'
import { useLocation } from 'react-router-dom'
import searchIcon from '../assets/searchIcon.svg'
import messageIcon from '../assets/message.svg'
import logoutIcon from '../assets/logout.svg'
import bellIcon from '../assets/bell.svg'
import styled from 'styled-components'
import { useUser } from '../context/userContext'

const HeaderContainer = styled.header`
  padding: 1.875rem 0 1.875rem 1.625rem;
  display:flex;
  background-color: white;
  justify-content:space-around;
  place-items:center;
  & h1 {
    text-align: left;
    font: normal normal 600 28px/42px Poppins;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
    text-transform: capitalize;
  }
  & .search {
    width: 20.0625rem;
    display: flex;
    place-items:center;
    background-color: #FCFCFC;
    border-radius: 12px;
    padding: 1rem 1.8125rem;
    &__input {
      border:none;
      background-color: inherit;
      flex-grow:1;
      outline:none;
    }
  }
  & .header__icons {
    display:flex;
    place-items:center;
    gap:2.375rem;
    & button {
      cursor: pointer;
      border: 2px solid white;
      background-color:inherit;
      padding: .25rem;
      & img {
        display: block;
        margin: auto;
        width: 26px;
        height: 24px;
      }
      &:hover{
        border: 2px solid #135846;
        border-radius:10px;
      } 
    }
  }
  & .header__user {
    width:60px;
    height:60px;
    border-radius:12px;
    background-color: #C5c5c5;
  }
  #btn-logout:hover {
    border: 2px solid #d04434;
    border-radius:10px;
  }
`

const Header = () => {
  const location = useLocation()
  const [, dispatch] = useUser()

  return (
    <HeaderContainer>
      <h1>{location.pathname.split('/')}</h1>
      <div className='search'>
        <input type="text" className='search__input' />
        <img src={searchIcon} alt="" />
      </div>
      <div className='header__icons'>
        <button>
          <img src={bellIcon} alt="" />
        </button>
        <button>
          <img src={messageIcon} alt="" />
        </button>
        <button onClick={() => dispatch({ type: 'logout' })} id='btn-logout'>
          <img src={logoutIcon} alt=""/>
        </button>
      </div>
    </HeaderContainer>
  )
}

export default Header
