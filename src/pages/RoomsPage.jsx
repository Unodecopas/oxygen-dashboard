import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import Selector from '../components/Selector'
import Switcher from '../components/Switcher'
import Table from '../components/Table'
import { fetchRooms, selectRoomsList } from '../slices/roomsListSlice'

const RoomsContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  padding-right: 3.125rem;
  & .switcher {
    display: flex;
    width: 100%;
    & div {
      flex-grow: 1;
    }
    & button {
      margin-right: 1.25rem;
    }
  }
  & table {
    margin-top: 1rem;
    & tbody {
      & td {
        cursor: pointer;
      }
    }
  }
  & .amenities {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    place-items: center;
    gap: 1rem;
    & span {
      color: #135846;
      border-radius: 12px;
      padding: 0.5rem;
    }
  }
  & .offer {
    color: #135846;
    background-color: #a2f3def6;
    padding: 0.5rem;
    border-radius: 12px; 
  }
  & .withOffer {
    padding: 0.5rem;
    border-radius: 12px;
    color: #721c24;
    background-color: #f8d7da;
    text-decoration: line-through;
  }
`

const RoomsPage = () => {
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rooms = useSelector(selectRoomsList)
  const [roomsState, setRoomsState] = useState([])
  const [searchTerm] = useState('')
  const [orderBy, setOrderBy] = useState('id')

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch, rooms])

  useEffect(() => {
    const filteredRooms = filter !== '' ? rooms.filter(room => room.status === filter) : rooms
    const orderedFilteredRooms = filteredRooms.filter(room => room.roomType.includes(searchTerm))
    orderedFilteredRooms.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) {
        return 1
      } else if (a[orderBy] < b[orderBy]) {
        return -1
      }
      return 0
    })
    setRoomsState(orderedFilteredRooms)
  }, [rooms, orderBy, searchTerm, filter])
  const handleFilter = (filter) => {
    setFilter(filter)
  }
  const handleRoom = (roomid) => {
    navigate(`/rooms/${roomid}`)
  }
  const handleButton = () => {
    navigate('/rooms/newroom')
  }
  const handleOrder = (value) => {
    setOrderBy(value)
  }
  return (
    <RoomsContainer>
      <div className='switcher'>
        <Switcher
        items={[{ label: 'All Rooms', value: '' }, { label: 'Avalaible Rooms', value: 'avalaible' }, { label: 'Booked Rooms', value: 'booked' }]}
        handleSwitcher={handleFilter}
        />
        <Button label={'+ New Room'} onClick={handleButton} primary/>
        <Selector options={['roomNumber', 'roomType']} onChange={handleOrder}/>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amenities</th>
            <th>Price</th>
            <th>Offer</th>
        </tr>
        </thead>
        <tbody>
          {
            roomsState && roomsState.map(room => {
              return (
                <tr key={room.id} onClick={() => handleRoom(room.id)}>
                  <td>
                    <div style={{ display: 'flex', placeItems: 'center' }}>
                      <img src={room.photos[0]} alt="" />
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <p>{room.roomType + room.roomNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className='amenities'>{room.amenities.map((amenitie, i) => {
                    return (
                      <span key={i}>{amenitie}</span>
                    )
                  })
                  }</td>
                  <td>
                    <p className={room.offer && 'withOffer'}>{room.price / 100 + '$'}</p>
                  </td>
                  <td>
                    <p className={room.offer && 'offer'}>{room.offer ? (room.price / 100 * (1 - room.discount / 100)).toFixed(2) + '$' : room.price / 100 + '$'}</p>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </RoomsContainer>
  )
}

export default RoomsPage
