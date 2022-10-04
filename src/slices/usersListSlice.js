import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersData from '../data/users.json'
import delay from '../utils/delay'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const delayedUsers = await delay(usersData)
  return delayedUsers
})

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState: {
    users: [],
    user: {},
    status: 'loading'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectUsersList = (state) => state.usersList.users

export default usersListSlice.reducer
