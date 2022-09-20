import { createSlice } from '@reduxjs/toolkit'
import conciergeData from '../data/concierge.json'

export const conciergeListSlice = createSlice({
  name: 'conciergeList',
  initialState: conciergeData,
  reducers: {}
})

export const selectConciergeList = (state) => state.conciergeList

export default conciergeListSlice.reducer
