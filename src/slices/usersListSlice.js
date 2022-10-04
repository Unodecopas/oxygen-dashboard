import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersData from '../data/users.json'
import delay from '../utils/delay'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const delayedUsers = await delay(usersData)
  return delayedUsers
})
export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id) => {
    const findUser = usersData.find((element) => element.id === Number(id))
    const user = await delay(findUser)
    return user
  }
)
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
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectUsersList = (state) => state.usersList.users
export const selectUser = (state) => state.usersList.user

export default usersListSlice.reducer
