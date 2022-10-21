import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit'
import usersData from '../data/users.json'
import { RootState } from '../store/store'
import delay from '../utils/delay'

interface UsersState {
  users: User[],
  user: User | null,
  status: 'loading' | 'error' | 'fulfilled'
}
export interface User {
  id:number,
  username:string,
  photo:string,
  email:string,
  startDate:string,
  job:string,
  contact:string,
  status: UserStatus
}
export enum UserStatus {
  active = 'active',
  inactive = 'inactive'
}

const initialState: UsersState = null

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const delayedUsers = await delay(usersData)
  return delayedUsers as User[]
})

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: number) => {
    const findUser= usersData.find((element) => element.id === Number(id))
    const user = await delay(findUser)
    return user as User
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser: number) => {
    const delayedUser = await delay(updatedUser)
    return delayedUser as User
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (deletedUser: number) => {
    const delayedUser = await delay(deletedUser)
    return delayedUser as User
  }
)

export const newUser = createAsyncThunk(
  'users/newUser',
  async (newUser: User) => {
    const delayedUser = await delay(newUser)
    return delayedUser as User
  }
)

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state: UsersState, action: PayloadAction<User[]>) => {
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
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled'
        state.users = state.users.filter((user: User) => user.id !== action.payload.id)
        state.users.push(action.payload)
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled'
        state.users = state.users.filter((user: User) => user.id !== action.payload.id)
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

export const selectUsersList = (state: RootState) => state.usersList.users
export const selectUser = (state: RootState) => state.usersList.user

export default usersListSlice.reducer
