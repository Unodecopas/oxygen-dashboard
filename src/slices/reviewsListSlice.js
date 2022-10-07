import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reviewsData from '../data/reviews.json'
import delay from '../utils/delay'

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const delayedReviews = await delay(reviewsData)
  return delayedReviews
})

export const fetchReview = createAsyncThunk(
  'reviews/fetchReview',
  async (id) => {
    const findReviews = reviewsData.find((element) => element.id === Number(id))
    const review = await delay(findReviews)
    return review
  }
)
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (updatedReview) => {
    const delayedReview = await delay(updatedReview)
    return delayedReview
  }
)
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (deletedReview) => {
    const delayedReview = await delay(deletedReview)
    return delayedReview
  }
)
export const newReview = createAsyncThunk(
  'reviews/newReview',
  async (newReview) => {
    const delayedReview = await delay(newReview)
    return delayedReview
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
      .addCase(fetchReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.review = action.payload
      })
      .addCase(fetchReview.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(updateReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews = state.reviews.filter((review) => review.id !== action.payload.id)
        state.reviews.push(action.payload)
      })
      .addCase(updateReview.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews = state.reviews.filter((review) => review.id !== action.payload.id)
      })
      .addCase(deleteReview.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(newReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews.push(action.payload)
      })
      .addCase(newReview.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const selectReviewsList = (state) => state.reviewsList.reviews
export const selectReview = (state) => state.reviewsList.review

export default reviewsListSlice.reducer
