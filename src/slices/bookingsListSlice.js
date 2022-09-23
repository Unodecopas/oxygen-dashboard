import { createSlice } from '@reduxjs/toolkit'
import bookingsData from '../data/bookings.json'

export const bookingsListSlice = createSlice({
  name: 'bookingsList',
  initialState: bookingsData,
  reducers: {}
})

export const selectBookingsList = (state) => state.bookingsList

export default bookingsListSlice.reducer
