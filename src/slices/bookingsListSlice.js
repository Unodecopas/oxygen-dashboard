import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bookingsData from '../data/bookings.json'
import delay from '../utils/delay'

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const delayedBookings = await delay(bookingsData)
  return delayedBookings
})
export const fetchBooking = createAsyncThunk(
  'bookings/fetchBooking',
  async (id) => {
    const findBookings = bookingsData.find((element) => element.id === Number(id))
    const booking = await delay(findBookings)
    return booking
  }
)
export const bookingsListSlice = createSlice({
  name: 'bookingsList',
  initialState: {
    bookings: [],
    booking: {},
    status: 'loading'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.bookings = action.payload
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchBooking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.booking = action.payload
      })
      .addCase(fetchBooking.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectBookingsList = (state) => state.bookingsList.bookings
export const selectBooking = (state) => state.bookingsList.booking

export default bookingsListSlice.reducer
