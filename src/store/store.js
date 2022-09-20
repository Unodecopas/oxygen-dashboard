import { configureStore } from '@reduxjs/toolkit'
import conciergeListReducer from '../slices/conciergeListSlice'

export const store = configureStore({
  reducer: {
    conciergeList: conciergeListReducer
  }
})
