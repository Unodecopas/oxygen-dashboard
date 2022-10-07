import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReview, selectReview } from '../../slices/reviewsListSlice'

const ReviewDetails = () => {
  const { reviewid } = useParams()
  const review = useSelector(selectReview)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReview(reviewid))
  }, [dispatch, review])

  return (
    <div>
      {
        Object.entries(review).map((key, i) => {
          return <p key={i}>{key[0]} : {key[1]}</p>
        })
      }
    </div>
  )
}

export default ReviewDetails
