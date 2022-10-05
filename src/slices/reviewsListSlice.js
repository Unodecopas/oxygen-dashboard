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
  async (id) => {
    const findReviews = reviewsData.find((element) => element.id === Number(id))
    const review = await delay(findReviews)
    return review
  }
)
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id) => {
    const findReviews = reviewsData.find((element) => element.id === Number(id))
    const review = await delay(findReviews)
    return review
  }
)
export const newReview = createAsyncThunk(
  'reviews/newReview',
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
      .addCase(fetchReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews = action.payload
      })
      .addCase(fetchReview.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(updateReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.reviews = state.review.filter((review) => review.id !== action.payload.id)
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
