import { createSlice } from '@reduxjs/toolkit'
import usersData from '../data/users.json'

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState: usersData,
  reducers: {}
})

export const selectUsersList = (state) => state.usersList

export default usersListSlice.reducer
