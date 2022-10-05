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
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (id) => {
    const findUser = usersData.find((element) => element.id === Number(id))
    const user = await delay(findUser)
    return user
  }
)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id) => {
    const findUser = usersData.find((element) => element.id === Number(id))
    const user = await delay(findUser)
    return user
  }
)
export const newUser = createAsyncThunk(
  'users/newUser',
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
        state.reviews = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews = action.payload
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users = state.user.filter((user) => user.id !== action.payload.id)
        state.users.push(action.payload)
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users = state.user.filter((user) => user.id !== action.payload.id)
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(newUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users.push(action.payload)
      })
      .addCase(newUser.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectUsersList = (state) => state.usersList.users
export const selectUser = (state) => state.usersList.user

export default usersListSlice.reducer
