import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: {
    searchTerm: ''
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    }
  }
})

export const { changeSearchTerm } = searchTermSlice.actions
export const selectSearchTerm = (state: RootState): string => state.searchTerm.searchTerm
export default searchTermSlice.reducer
