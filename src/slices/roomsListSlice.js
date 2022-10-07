import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import roomsData from '../data/rooms.json'
import delay from '../utils/delay'

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async () => {
    const delayedRooms = await delay(roomsData)
    return delayedRooms
  })
export const fetchRoom = createAsyncThunk(
  'rooms/fetchRoom',
  async (id) => {
    const findRoom = roomsData.find((element) => element.id === Number(id))
    const room = await delay(findRoom)
    return room
  }
)
export const updateRoom = createAsyncThunk(
  'rooms/updateRoom',
  async (updatedRoom) => {
    const delayedRoom = await delay(updatedRoom)
    return delayedRoom
  }
)
export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (deletedRoom) => {
    const delayedRoom = await delay(deletedRoom)
    return delayedRoom
  }
)
export const newRoom = createAsyncThunk(
  'rooms/newRoom',
  async (newRoom) => {
    const delayedRoom = await delay(newRoom)
    return delayedRoom
  }
)

export const roomsListSlice = createSlice({
  name: 'roomsList',
  initialState: {
    rooms: [],
    room: {},
    status: 'loading'
  },
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
        state.status = 'pending'
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

export const selectRoomsList = (state) => state.roomsList.rooms
export const selectRoom = (state) => state.roomsList.room

export default roomsListSlice.reducer
