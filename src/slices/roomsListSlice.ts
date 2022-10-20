import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import roomsData from '../data/rooms.json'
import { RootState } from '../store/store'
import delay from '../utils/delay'

interface RoomsState {
  rooms: Room[],
  room: Room,
  status: 'loading' | 'error' | 'fulfilled'
}

interface Room {
  id:number,
  photos:string[],
  roomType:string,
  roomNumber:string,
  description:string,
  offer:true,
  price:number,
  discount:number,
  cancellation:string,
  amenities:string[]
}

const initialState: RoomsState = {
  rooms: [],
  room: {  
    id:0,
    photos:['',''],
    roomType:'',
    roomNumber:'',
    description:'',
    offer:true,
    price:0,
    discount:0,
    cancellation:'',
    amenities:['','']
  },
  status: 'loading'
}

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async () => {
    const delayedRooms = await delay(roomsData)
    return delayedRooms as Room[]
  })

export const fetchRoom = createAsyncThunk(
  'rooms/fetchRoom',
  async (id: number) => {
    const findRoom = roomsData.find((element) => element.id === Number(id))
    const room = await delay(findRoom)
    return room as Room
  }
)

export const updateRoom = createAsyncThunk(
  'rooms/updateRoom',
  async (updatedRoom) => {
    const delayedRoom = await delay(updatedRoom)
    return delayedRoom as Room
  }
)

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (deletedRoom) => {
    const delayedRoom = await delay(deletedRoom)
    return delayedRoom as Room
  }
)

export const newRoom = createAsyncThunk(
  'rooms/newRoom',
  async (newRoom) => {
    const delayedRoom = await delay(newRoom)
    return delayedRoom as Room
  }
)

export const roomsListSlice = createSlice({
  name: 'roomsList',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.rooms = action.payload
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchRoom.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.room = action.payload
      })
      .addCase(fetchRoom.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(updateRoom.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.rooms = state.rooms.filter((room) => room.id !== action.payload.id)
        state.rooms.push(action.payload)
      })
      .addCase(updateRoom.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteRoom.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.rooms = state.rooms.filter((room) => room.id !== action.payload.id)
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(newRoom.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(newRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.rooms.push(action.payload)
      })
      .addCase(newRoom.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectRoomsList = (state: RootState) => state.roomsList.rooms
export const selectRoom = (state: RootState) => state.roomsList.room

export default roomsListSlice.reducer
