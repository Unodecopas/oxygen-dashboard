import { createSlice } from '@reduxjs/toolkit'

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
export const selectSearchTerm = (state) => state.searchTerm.searchTerm
export default searchTermSlice.reducer
