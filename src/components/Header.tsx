import styled from 'styled-components'
import searchIcon from '../assets/searchIcon.svg'
import React, { useEffect, useState } from 'react'
import messageIcon from '../assets/message.svg'
import logoutIcon from '../assets/logout.svg'
import bellIcon from '../assets/bell.svg'
import { useUser } from '../context/userContext'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useDebounce from '../utils/useDebounce'
import { changeSearchTerm } from '../slices/searchTermSlice'

const HeaderContainer = styled.header`
  padding: 1.875rem 0 1rem 1.625rem;
  display:flex;
  background-color: white;
  justify-content:space-around;
  place-items:center;
  & h1 {
    text-align: left;
    font-size: 28px;
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
    & button {
      cursor: pointer;
      border-radius: 100%;
      border: none;
      padding: 0 5px;
      margin-right: 1rem;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid red
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
      transition:all 0.3s ease-out;
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

const Header = (): JSX.Element => {
  const { pathname } = useLocation()
  const location = pathname.split('/')[1]
  const [, dispatch] = useUser()
  const dispatcher = useDispatch()
  const [searchInput, setSearchInput] = useState<string>()
  const debounceTerm = useDebounce(searchInput, 500)

  useEffect(() => {
    dispatcher(changeSearchTerm(debounceTerm))
  }, [dispatcher, debounceTerm])
  useEffect(() => {
    setSearchInput('')
  }, [dispatcher, location])
  return (
    <HeaderContainer>
      <h1>{location}</h1>
      {location !== 'dashboard' &&
        <div className='search'>
          <input
            type='text'
            className='search__input'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder='Search ...'
          />
          {(searchInput?.length !== 0) && <button onClick={() => setSearchInput('')}>x</button>}
          <img src={searchIcon} alt='' />
        </div>}
      <div className='header__icons'>
        <button>
          <img src={bellIcon} alt='' />
        </button>
        <button>
          <img src={messageIcon} alt='' />
        </button>
        <button onClick={() => dispatch({ type: 'logout' })} id='btn-logout'>
          <img src={logoutIcon} alt='' />
        </button>
      </div>
    </HeaderContainer>
  )
}

export default Header
