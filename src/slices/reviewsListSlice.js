import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reviewsData from '../data/reviews.json'
import delay from '../utils/delay'

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const delayedReviews = await delay(reviewsData)
  return delayedReviews
})

export const fetchBooking = createAsyncThunk(
  'reviews/fetchReview',
  async (id) => {
    const findReviews = reviewsData.find((element) => element.id === Number(id))
    const review = await delay(findReviews)
    return review
  }
)

export const reviewsListSlice = createSlice({
  name: 'reviewsList',
  initialState: {
    reviews: [],
    review: {},
    status: 'loading'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews = action.payload
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectReviewsList = (state) => state.reviewsList.reviews
export const selectReview = (state) => state.reviewsList.review

export default reviewsListSlice.reducer
