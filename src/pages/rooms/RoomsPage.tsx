import Table from '../../components/Table'
import Switcher from '../../components/Switcher'
import Switch from '../../components/Switch'
import styled from 'styled-components'
import Selector from '../../components/Selector'
import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchRooms, Room } from '../../slices/roomsListSlice'
import orderState from '../../utils/orderState'
import { selectSearchTerm } from '../../slices/searchTermSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const RoomsContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  & table {
    & tbody {
      & td {
        cursor: pointer;
      }
    }
  }
  & .amenities {
    display: flex;
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

const RoomsPage = (): JSX.Element => {
  const [filter, setFilter] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const rooms = useAppSelector(state => state.roomsList.rooms)
  const [roomsState, setRoomsState] = useState([])
  const searchTerm = useSelector(selectSearchTerm)
  const [orderBy, setOrderBy] = useState('id')
  const [showRooms, setShowRooms] = useState<Room[]>([])

  useEffect(() => {
    dispatch(fetchRooms()).catch(Error)
  }, [dispatch, rooms])

  useEffect(() => {
    const filteredRooms = filter !== '' ? rooms.filter(room => room.roomType === filter) : rooms
    const searchFilteredRooms = filteredRooms.filter(room => room.roomType.toLowerCase().includes(searchTerm.toLowerCase()))
    const orderedFilteredRooms = orderState(searchFilteredRooms, orderBy)
    setRoomsState(orderedFilteredRooms as [])
  }, [rooms, orderBy, searchTerm, filter])

  const handleFilter = (filter: string): void => {
    setFilter(filter)
  }
  const handleRoom = (roomid: number): void => {
    navigate(`/rooms/${roomid}`)
  }
  const handleButton = (): void => {
    navigate('/rooms/newroom')
  }
  const handleOrder = (value: string): void => {
    setOrderBy(value)
  }

  return (
    <RoomsContainer>
      <Switcher>
        <>
          <Switch
            items={[{ label: 'All Rooms', value: '' }, { label: 'Avalaible Rooms', value: 'avalaible' }, { label: 'Booked Rooms', value: 'booked' }]}
            handleSwitcher={handleFilter}
          />
          <Button label='+ New Room' onClick={handleButton} primary />
          <Selector
            options={[
              { label: 'id', value: 'id' },
              { label: 'Price', value: 'price' }
            ]} onChange={handleOrder}
          />
        </>
      </Switcher>
      <Table>
        <>
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
            showRooms?.map(room => {
              return (
                <tr key={room.id} onClick={() => handleRoom(room.id)}>
                  <td>
                    <div style={{ display: 'flex', placeItems: 'center' }}>
                      <img src={room.photos[0]} alt='' />
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <p>{room.roomType + room.roomNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className='amenities'>{room.amenities.map((amenitie, i) => {
                    return <span key={i}>{amenitie}</span>
                  })}
                  </td>
                  <td>
                    <p className={room.offer ? 'withOffer' : ''}>{`${room.price / 100} $`}</p>
                  </td>
                  <td>
                    <p className={room.offer ? 'offer' : ''}>
                      {room.offer
                        ? (room.price / 100 * (1 - room.discount / 100)).toFixed(2) + '$'
                        : `${room.price / 100} $`}
                    </p>
                  </td>
                </tr>
              )
            })
}
          </tbody>
        </>
      </Table>
      <Pagination items={roomsState} itemsPerPage={4} setItems={setShowRooms} />
    </RoomsContainer>
  )
}

export default RoomsPage
