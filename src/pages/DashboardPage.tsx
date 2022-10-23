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
import 'pure-react-carousel/dist/react-carousel.es.css'
import BarChart from '../components/BarChart'
import { useAppDispatch, useAppSelector } from '../hooks'
import Notices from '../components/Notices'
import { useNavigate } from 'react-router-dom'

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
      border: none;
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
interface KPI {
  icon: string
  value: number | string
  text: string
}
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

  const data = [
    { day: '08/22/2022', sales: 2500, occupation: 20 },
    { day: '08/23/2022', sales: 3000, occupation: 10 },
    { day: '08/24/2022', sales: 1100, occupation: 12 },
    { day: '08/25/2022', sales: 800, occupation: 14 },
    { day: '08/26/2022', sales: 2850, occupation: 60 },
    { day: '08/27/2022', sales: 4673, occupation: 15 },
    { day: '08/28/2022', sales: 3857, occupation: 80 }
  ]

  return (
    <DashboardContainer>
      <KPIs items={items} />
      <div className='widgets'>
        <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
        <BarChart data={data} />
      </div>
      <div className='reviews'>
        <h3>Latests Customer Reviews</h3>
        <Notices items={firtsReviews} handleNotice={handleReview} />
      </div>

    </DashboardContainer>
  )
}

export default DashboardPage
