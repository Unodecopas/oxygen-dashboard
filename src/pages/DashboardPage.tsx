import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import KPIs from '../components/KPIs'
import exit from '../assets/exit.svg'
import door from '../assets/door.svg'
import bed from '../assets/bed.svg'
import { useSelector } from 'react-redux'
import { fetchRooms, selectRoomsList } from '../slices/roomsListSlice'
import { fetchReviews, Review, selectReviewsList } from '../slices/reviewsListSlice'
import { fetchBookings } from '../slices/bookingsListSlice'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import BarChart from '../components/BarChart'
import { useAppDispatch, useAppSelector } from '../hooks'
import Notices from '../components/Notices'
import { useNavigate } from 'react-router-dom'
import { KPI } from '../types'
import { statistics } from '../data/statistics'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & .widgets {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    & .fc {
      width: 100%;
      height: 100%;
      border: none;
      overflow: hidden;
      border-style: none !important;
      background-color: ${props => props.theme.colors.bgPrimary};
      color: ${props => props.theme.colors.primary};
      padding: 1rem;
      border-radius: 12px;
      & button {
        background-color: ${props => props.theme.button.bgPrimary};
      }
      &-today-button{
        background-color: ${props => props.theme.button.bgPrimary};
      }
      
    }
    .fc-scrollgrid{
      border: none;
    }
    .fc td, .fc th {
      border-style: none !important;
    }
    .fc-day-today{
      background-color: ${props => props.theme.button.bgPrimary};
      color: ${props => props.theme.button.primary};
    }
    .fc-view-harness, .fc-view-harness-active{
      overflow: hidden;
    }
    .fc .fc-scrollgrid-section-sticky > *{
      background: none
    }  
  }
  & .reviews {
    margin-top: 1rem;
    border-radius: 12px;
    background-color: ${props => props.theme.colors.bgPrimary};
    padding: 1rem;
    color: ${props => props.theme.colors.primary};
    & h3 {
      margin-bottom: 1rem;
    }
    & .notice {
      border: 1px solid ${props => props.theme.colors.secondary};
    }
  }
  
`

const DashboardPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const bookings = useAppSelector(state => state.bookingsList.bookings)
  const rooms = useSelector(selectRoomsList)
  const reviews = useSelector(selectReviewsList)
  const [firtsReviews, setFirstsReviews] = useState<Review[]>([])

  const [items, setItems] = useState<KPI[]>([])

  useEffect(() => {
    dispatch(fetchBookings()).catch(Error)
  }, [dispatch, bookings])

  useEffect(() => {
    dispatch(fetchRooms()).catch(Error)
  }, [dispatch, rooms])

  useEffect(() => {
    dispatch(fetchReviews()).catch(Error)
  }, [dispatch, reviews])

  useEffect(() => {
    const firsts = reviews.slice(0, 5)
    setFirstsReviews(firsts)
  }, [reviews])

  useEffect(() => {
    const totalbookings = bookings.length
    const bookingsCheckin = bookings.filter(booking => booking.status === 'checkin')
    const percentOccupedRooms = `${rooms.length * bookingsCheckin.length / 100} %`
    const bookingsCheckout = bookings.filter(booking => booking.status === 'checkout')
    setItems([
      { icon: bed, value: totalbookings, text: 'New Bookings' },
      { icon: bed, value: percentOccupedRooms, text: 'Occupped Rooms' },
      { icon: door, value: bookingsCheckin.length, text: 'Check In' },
      { icon: exit, value: bookingsCheckout.length, text: 'Check Out' }
    ])
  }, [bookings, rooms])

  const handleReview = (reviewid: number): void => {
    navigate(`/contact/${reviewid}`)
  }

  return (
    <DashboardContainer>
      <KPIs items={items} />
      <div className='widgets'>
        <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' height='auto' />
        <BarChart data={statistics} />
      </div>
      <div className='reviews'>
        <h3>Latests Customer Reviews</h3>
        <Notices items={firtsReviews} handleNotice={handleReview} />
      </div>

    </DashboardContainer>
  )
}

export default DashboardPage
