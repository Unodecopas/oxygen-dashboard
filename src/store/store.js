import { configureStore } from '@reduxjs/toolkit'
import usersListReducer from '../slices/usersListSlice'
import bookingsListReducer from '../slices/bookingsListSlice'

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
    bookingsList: bookingsListReducer
  }
})
