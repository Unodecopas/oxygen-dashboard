import { configureStore } from '@reduxjs/toolkit'
import usersListReducer from '../slices/usersListSlice'

export const store = configureStore({
  reducer: {
    usersList: usersListReducer
  }
})
