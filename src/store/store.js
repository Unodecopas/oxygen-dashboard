import { configureStore } from '@reduxjs/toolkit'
import usersListReducer from '../slices/usersListSlice'
import bookingsListReducer from '../slices/bookingsListSlice'
import reviewsListReducer from '../slices/reviewsListSlice'
import roomsListReducer from '../slices/roomsListSlice'

export const store = configureStore({
  reducer: {
    usersList: usersListReducer,
    bookingsList: bookingsListReducer,
    reviewsList: reviewsListReducer,
    roomsList: roomsListReducer
  }
})
