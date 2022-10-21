import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reviewsData from '../data/reviews.json'
import { RootState } from '../store/store';
import delay from '../utils/delay'

interface ReviewsState {
  reviews: Review[],
  review: Review | null,
  status: 'loading' | 'error' | 'fulfilled'
}
export interface Review {
  id: number;
  date: string;
  customer: string;
  email: string;
  phone: string;
  comment: string;
  subject: string;
  status: ReviewsStatus;
}

enum ReviewsStatus {
  unread = 'unread',
  archived = 'archived',
  published = 'published'
}

const initialState: ReviewsState = null

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const delayedReviews = await delay(reviewsData)
  return delayedReviews as Review[]
})

export const fetchReview = createAsyncThunk(
  'reviews/fetchReview',
  async (id: number) => {
    const findReviews = reviewsData.find((element) => element.id === Number(id))
    const review = await delay(findReviews)
    return review as Review
  }
)
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (updatedReview) => {
    const delayedReview = await delay(updatedReview)
    return delayedReview as Review
  }
)
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (deletedReview) => {
    const delayedReview = await delay(deletedReview)
    return delayedReview as Review
  }
)
export const newReview = createAsyncThunk(
  'reviews/newReview',
  async (newReview) => {
    const delayedReview = await delay(newReview)
    return delayedReview as Review
  }
)

export const reviewsListSlice = createSlice({
  name: 'reviewsList',
  initialState,
  reducers:{},
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

export const selectReviewsList = (state: RootState) => state.reviewsList.reviews
export const selectReview = (state: RootState) => state.reviewsList.review

export default reviewsListSlice.reducer
