import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { fetchUser, selectUser } from '../../slices/usersListSlice'
import phone from '../../assets/phone.svg'
import message from '../../assets/chat.svg'

const UserDetailsContainer = styled.div`
  width: 100%;
  background-color: #ffff;
  height: 100%;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  & .user__info {
    display: flex;
    color: #212121;
    font-size: 20px;
    gap: 2rem;
    & img {
      width: 156px;
      height: 100%;
      border-radius: 10px;
    }
    &__text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      & .user__id {
        color: #799283;
      }
      & .user__icons {
        margin-top: 1rem;
        display: flex;
        gap: 2rem;
        & button {
          cursor: pointer;
          padding: 1rem 20px;
          border-radius: 12px;
        }
        & img {
          width: 2rem;
          height: 2rem;
        }
        &__phone {
          border: 1px solid #E8F2EF;
          background-color: transparent;
          & a{
            text-decoration: none;
            display: flex;
            place-items: center;
            gap: 1rem;
          }
          &:active{
            transform: translateY(5px);
          }
        }
        &__mail {
          display: flex;
          place-items: center;
          background-color: #135846;
          color: white;
          border: none;
          & a{
            text-decoration: none;
            display: flex;
            place-items: center;
            gap: 1rem;
          }
          & img {
            fill: white;
            color: white;
          }
          &:active{
            transform: translateY(5px);
          }
        }
      }
    }
  }
  & .user__job{
    margin-top: 1.5rem;
    display: flex;
    width: 100%;
    gap: 2rem;
    & h3 {
      font-size: 25px;
      overflow: hidden;
      white-space: nowrap;
    }
    &__status {
      display: flex;
      flex-direction: column;
      & .active {
        padding: 0.5rem;
        border-radius: 10px;
        text-align: center;
        color: #135846;
        background-color: #a2f3def6;
      }
      & .inactive {
        color: #721c24;
        text-align: center;
        background-color: #f8d7da;
        padding: 0.5rem;
        border-radius: 10px;
      }
    }
    &__date{
      display: flex;
      flex-direction: column;
      place-items: center;
      & p {
        padding: 0.5rem;
      }
    }
  }
  & .user__description {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    & h3 {
      font-size: 25px;
    }
  }
`

const UserDetails = () => {
  const { userid } = useParams()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser(userid))
  }, [dispatch, user])

  return (
    <UserDetailsContainer>
      {user
        ? <>
            <div className='user__info'>
              <img src={user.photo} alt="" />
              <div className='user__info__text'>
                <h2>{user.username}</h2>
                <p className='user__id'> <span>ID</span> {user.id}</p>
                <div className='user__icons'>
                  <button className='user__icons__phone'>
                    <a href={`tel:${user.contac}`}>
                    <img src={phone} alt="" />
                    {user.contact}
                    </a>
                  </button>
                  <button className='user__icons__mail'>
                    <a href={`mailto:${user.email}`}>
                    <img src={message} alt="" />
                    Send Message
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className='user__job'>
              <div className='user__job__status'>
                <h3>Status</h3>
                <p className={user.status === 'inactive' ? 'inactive' : 'active'}>{user.status}</p>
              </div>
              <div className="user__job__date">
                <h3>Start Date</h3>
                <p>{user.startDate}</p>
              </div>
            </div>
            <div className='user__description'>
                <h3>Description</h3>
                <p>{user.job}</p>
            </div>
          </>
        : <p> No se encontró el usuario</p>
      }
    </UserDetailsContainer>
  )
}

export default UserDetails
