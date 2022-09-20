import React from 'react'
import { useLocation } from 'react-router-dom'
import searchIcon from '../assets/searchIcon.svg'
import mailIcon from '../assets/mail.svg'
import messageIcon from '../assets/message.svg'
import bellIcon from '../assets/bell.svg'
import hearthIcon from '../assets/heart.svg'
import styled from 'styled-components'

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
    & img {
      width: 26px;
      height: 24px;
    }
  }
  & .header__user {
    width:60px;
    height:60px;
    border-radius:12px;
    background-color: #C5c5c5;
  }
  & select {
    font: normal normal 600 18px/27px Poppins;
letter-spacing: 0px;
color: #E23428;
    color: red;
    height:100%;
    border:none;
  }
`

const Header = () => {
  const location = useLocation()
  return (
    <HeaderContainer>
      <h1>{location.pathname.split('/')}</h1>
      <div className='search'>
        <input type="text" className='search__input' />
        <img src={searchIcon} alt="" />
      </div>
      <div className='header__icons'>
        <img src={hearthIcon} alt="" />
        <img src={mailIcon} alt="" />
        <img src={bellIcon} alt="" />
        <img src={messageIcon} alt="" />
      </div>
      <div className='header__user'></div>
      <select name="language" id="language">
        <option value="EN">EN</option>
        <option value="ES">ES</option>
      </select>
    </HeaderContainer>
  )
}

export default Header
