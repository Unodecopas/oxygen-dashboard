import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRoom } from '../../slices/roomsListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const RoomContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  & .room__info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 1rem;
    &__text {
      display: flex;
      gap: 2rem;
      flex-grow: 1;
    }
    & h4 {
      font-size: 24px;
      color: #212121;
      &.discount {
        color: #b84853;
      }
      &.finalPrice {
        color: #2d6b5b;
      }
    }
  }
  & .night {
    font-size: 14px;
    color: #799283;
  }
  & .title {
    font-size: 14px;
    color: #6E6E6E;
  }
  & .amenities {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__items {
      display: flex;
      gap: 1rem;
    }
  }
  & .amenitie {
    padding: 1rem;
    border-radius: 12px;
    background-color: #e8f2ef;
    color: #2d6b5b;
    width: fit-content;
  }
`
const RoomDetails = (): JSX.Element => {
  const { roomid } = useParams()
  const room = useAppSelector((state) => state.roomsList.room)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRoom(Number(roomid))).catch(Error)
  }, [dispatch, room])
  return (
    <RoomContainer>
      {(room != null) &&
        <div className='room__info'>
          <div className='room__info__text'>
            <div className=''>
              <p className='title'>Room Info</p>
              <h4>{room.roomType + room.roomNumber}</h4>
            </div>
            <div className=''>
              <p className='title'>Price</p>
              <h4>{`${room.price / 100} $`} <span className='night'>/night</span></h4>
            </div>
            {
            room.offer &&
              <>
                <div className='offer'>
                  <p className='title'>Discount</p>
                  <h4 className='discount'>{`${room.discount} %`}</h4>
                </div>
                <div className='price'>
                  <p className='title'>Final Price</p>
                  <h4 className='finalPrice'>{(room.price / 100 * (1 - room.discount / 100)).toFixed(2) + '$'} <span className='night'>/night</span></h4>
                </div>
              </>
          }
          </div>
          <hr />
          <div className=''>
            <h4>Description</h4>
            <p className='title'>{room.description}</p>
          </div>
          <div className=''>
            <h4>Cancellation</h4>
            <p className='title'>{room.cancellation}</p>
          </div>
          <div className='amenities'>
            <h4>Amenties</h4>
            <div className='amenities__items'>
              {
              room.amenities.map((amenitie: string, i: number) => {
                return <div key={i} className='amenitie'>{amenitie}</div>
              })
            }
            </div>
          </div>
        </div>}
    </RoomContainer>
  )
}

export default RoomDetails
