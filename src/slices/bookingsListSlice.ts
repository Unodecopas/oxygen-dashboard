import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bookingsData from '../data/bookings.json'
import { RootState } from '../store/store';
import delay from '../utils/delay'

export interface Booking {
  id: number;
  guestName: string;
  orderDate: string;
  checkin: string;
  checkout: string;
  request: string;
  roomType: string;
  status: BookingStatus;
}
export enum BookingStatus {
  checkin = 'checkin',
  checkout = 'checkout'
}
interface BookingsState {
  bookings: Booking[],
  booking: Booking | null,
  status: 'loading' | 'error' | 'fulfilled'
}

const initialState: BookingsState =  null

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    const delayedBookings = await delay(bookingsData)
    return delayedBookings as Booking[]
  })
export const fetchBooking = createAsyncThunk(
  'bookings/fetchBooking',
  async (id: number) => {
    const findBookings = bookingsData.find((element) => element.id === Number(id))
    const booking = await delay(findBookings)
    return booking as Booking
  }
)
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (updatedBooking: Booking) => {
    const delayedBooking = await delay(updatedBooking)
    return delayedBooking as Booking
  }
)
export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (deletedBooking: Booking) => {
    const delayedBooking = await delay(deletedBooking)
    return delayedBooking as Booking
  }
)
export const newBooking = createAsyncThunk(
  'bookings/newBooking',
  async (newBooking: Booking) => {
    const delayedBooking = await delay(newBooking)
    return delayedBooking as Booking
  }
)
export const bookingsListSlice = createSlice({
  name: 'bookingsList',
  initialState,
  reducers:{},
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
      .addCase(updateBooking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload.id)
        state.bookings.push(action.payload)
      })
      .addCase(updateBooking.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteBooking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload.id)
      })
      .addCase(deleteBooking.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(newBooking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(newBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.bookings.push(action.payload)
      })
      .addCase(newBooking.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectBookingsList = (state: RootState) => state.bookingsList.bookings
export const selectBooking = (state: RootState) => state.bookingsList.booking

export default bookingsListSlice.reducer
