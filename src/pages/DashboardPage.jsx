import React, { useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import bed from '../assets/bed.svg'
import exit from '../assets/exit.svg'
import door from '../assets/door.svg'
import { useDispatch, useSelector } from 'react-redux'
import KPIs from '../components/KPIs'
import { fetchBookings, selectBookingsList } from '../slices/bookingsListSlice'
import styled from 'styled-components'
import { fetchRooms, selectRoomsList } from '../slices/roomsListSlice'
import { fetchReviews, selectReviewsList } from '../slices/reviewsListSlice'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & .reviews {
    margin-top: 1rem;
    border-radius: 12px;
    background-color: white;
    padding: 1rem;
  }
  & .carousel {
    margin-top: 1rem;
    display: flex;
    & .slideInner___2mfX9{
      display: flex;
    }
    &__slider{
      width: 100%;
      flex-grow: 1;
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
  & .notice {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 12px;
      margin-right: 1rem;
      height: 100%;
      padding: 20px;
      width: 100%;
      border: 1px solid grey;
      background-color: white;
      &__subject {
        flex-grow: 1;
        font-size: 12px;
        font-style: italic;
      }
    }
`
const DashboardPage = () => {
  const dispatch = useDispatch()
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
  return (
    <DashboardContainer>
      <KPIs items={items}/>
      <div className='reviews'>
        <h3>Latests Customer Reviews</h3>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={80}
          totalSlides={reviews.length}
          visibleSlides={3}
          step={3}
        >
          <div className='carousel__buttons'>
            <ButtonBack>{'<'}</ButtonBack>
          </div>
          <Slider>
            {
              reviews.map((review, i) => {
                return (
                <Slide index={i} key={review.id}>
                  <div key={review.id} className='notice'>
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
