import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import KPIs from '../components/KPIs'
import exit from '../assets/exit.svg'
import door from '../assets/door.svg'
import bed from '../assets/bed.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms, selectRoomsList } from '../slices/roomsListSlice'
import { fetchReviews, selectReviewsList } from '../slices/reviewsListSlice'
import { fetchBookings, selectBookingsList } from '../slices/bookingsListSlice'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import 'pure-react-carousel/dist/react-carousel.es.css'
import BarChart from '../components/BarChart'

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
      background-color: white;
      padding: 1rem;
      border-radius: 12px;
      & button {
        background-color: #135846;
      }
      &-today-button{
        background-color: #135846;
      }
      
    }
    .fc-scrollgrid{
      border: none;
    }
    .fc td, .fc th {
      border-style: none !important;
    }
    .fc-day-today{
      background-color: #135846;
      color: white;
    }
  }
  & .reviews {
    margin-top: 1rem;
    border-radius: 12px;
    background-color: white;
    padding: 1rem;
  }
  & .carousel {
    margin-top: 1rem;
    display: flex;
    margin-bottom: 1rem;
    &__slider{
      width: 100%;
      flex-grow: 1;
      margin-top: 1rem;
    }
    & .notice {
      display: flex;
      padding: 1rem;
      margin-right: 1rem;
      height: 100%;
    }
    &__buttons {
      display: flex;
      place-items: center;
      & button {
        background-color:#135846 ;
        color: white;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 10px;

        &:disabled{
        visibility: hidden;
        }
      }
    }
  }
`

const DashboardPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bookings = useSelector(selectBookingsList)
  const rooms = useSelector(selectRoomsList)
  const reviews = useSelector(selectReviewsList)
  const [items, setItems] = useState([])

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch, bookings])

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch, rooms])

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch, reviews])

  useEffect(() => {
    const totalbookings = bookings.length
    const bookingsCheckin = bookings.filter(booking => booking.status === 'checkin')
    const percentOccupedRooms = rooms.length * bookingsCheckin.length / 100 + '%'
    const bookingsCheckout = bookings.filter(booking => booking.status === 'checkout')
    setItems([
      { icon: bed, value: totalbookings, text: 'New Bookings' },
      { icon: bed, value: percentOccupedRooms, text: 'Occupped Rooms' },
      { icon: door, value: bookingsCheckin.length, text: 'Check In' },
      { icon: exit, value: bookingsCheckout.length, text: 'Check Out' }
    ])
  }, [bookings, rooms])

  const data = {
    sales: [
      { day: '08/22/2022', value: 2500 },
      { day: '08/23/2022', value: 3000 },
      { day: '08/24/2022', value: 1100 },
      { day: '08/25/2022', value: 800 },
      { day: '08/26/2022', value: 2850 },
      { day: '08/27/2022', value: 4673 },
      { day: '08/28/2022', value: 3857 }
    ],
    occupation: [
      { day: '08/22/2022', value: 20 },
      { day: '08/23/2022', value: 32 },
      { day: '08/24/2022', value: 38 },
      { day: '08/25/2022', value: 30 },
      { day: '08/26/2022', value: 67 },
      { day: '08/27/2022', value: 89 },
      { day: '08/28/2022', value: 70 }
    ]
  }

  return (
    <DashboardContainer>
      <KPIs items={items}/>
      <div className='widgets'>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        <BarChart data={data}/>
      </div>
      <div className='reviews'>
        <h3>Latests Customer Reviews</h3>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={80}
          totalSlides={reviews.length}
          visibleSlides={4}
          step={4}
        >
          <div className='carousel__buttons'>
            <ButtonBack>{'<'}</ButtonBack>
          </div>
          <Slider style={{ gap: '1rem' }}>
            {
              reviews.map((review, i) => {
                return (
                <Slide style={{ marginRigth: '1rem' }} index={i} key={review.id} className='slide'>
                  <div className='notice' onClick={() => navigate(`/contact/${review.id}`)}>
                    <p className='notice__subject'>{'" ' + review.subject + ' "'}</p>
                    <p>{review.customer}</p>
                    <p>{review.date}</p>
                  </div>
                </Slide>)
              })
            }
          </Slider>
          <div className='carousel__buttons'>
            <ButtonNext>{'>'}</ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </DashboardContainer>
  )
}

export default DashboardPage
