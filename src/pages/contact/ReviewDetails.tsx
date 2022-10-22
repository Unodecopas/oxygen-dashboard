import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchReview } from '../../slices/reviewsListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const ReviewDetails = (): JSX.Element => {
  const { reviewid } = useParams()
  const review = useAppSelector(state => state.reviewsList.review)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchReview(Number(reviewid))).catch(Error)
  }, [dispatch, review])

  return (
    <div>
      REVIEW DETAILS
    </div>
  )
}

export default ReviewDetails
