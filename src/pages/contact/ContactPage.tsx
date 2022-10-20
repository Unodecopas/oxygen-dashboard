import Table from '../../components/Table'
import Switcher from '../../components/Switcher'
import Switch from '../../components/Switch'
import styled from 'styled-components'
import Selector from '../../components/Selector'
import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews, selectReviewsList } from '../../slices/reviewsListSlice'
import orderState from '../../utils/orderState'
import { selectSearchTerm } from '../../slices/searchTermSlice'
import { useAppDispatch } from '../../hooks'

const ReviewsPageContainer = styled.div`
  & .table__small {
    font-size: .8rem;
  }
  & .actions {
    display: flex;
    gap: 1rem;
    & button {
      cursor: pointer;
      background-color: transparent;
      border: none;
    }
    & .publish {
      color: #135846;
      background-color: #a2f3def6;
      padding: 0.5rem;
      border-radius: 12px;
    }
    & .archive {
      padding: 0.5rem;
      border-radius: 12px;
      color: #721c24;
      background-color: #f8d7da;
    }
  }
  & .date {
    overflow: hidden;
    white-space: nowrap;
  }
`

interface Review {
  id: number,
  subject: string,
  customer: string,
  date: string
}
const ContactPage = () => {
  const [filter, setFilter] = useState('')
  const reviews = useSelector(selectReviewsList)
  const dispatch = useAppDispatch()
  const [firtsReviews, setFirstsReviews] = useState<Review[]>([])
  const [orderBy, setOrderBy] = useState('date')
  const searchTerm = useSelector(selectSearchTerm)
  const navigate = useNavigate()
  const [reviewsState, setReviewsState] = useState([])
  const [showReviews, setShowReviews] = useState<Review[]>([])

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch, fetchReviews])

  useEffect(() => {
    const firsts = reviewsState.slice(0, 5)
    setFirstsReviews(firsts)
  }, [reviewsState])

  useEffect(() => {
    const filteredReviews = filter !== '' ? reviews.filter(review => review.status === filter) : reviews
    const searchFilteredReviews = filteredReviews.filter(review => review.customer.toLowerCase().includes(searchTerm.toLowerCase()))
    const orderedFilteredReviews = orderState(searchFilteredReviews, orderBy)
    setReviewsState(orderedFilteredReviews as any)
  }, [reviews, orderBy, searchTerm, filter])

  const handleFilter = (filter: string) => {
    setFilter(filter)
  }
  const handleOrder = (value: string) => {
    setOrderBy(value)
  }
  const handleReview = (reviewid: number) => {
    navigate(`/contact/${reviewid}`)
  }

  return (
    <ReviewsPageContainer>
      <div className='notices'>
      {
        firtsReviews.map(review => {
          return (
            <div key={review.id} className='notice' onClick={() => handleReview(review.id)}>
              <p className='notice__subject'>{'" ' + review.subject + ' "'}</p>
              <p>{review.customer}</p>
              <p>{review.date}</p>
            </div>
          )
        })
      }
      </div>
      <Switcher>
        <>
          <Switch
          items={[{ label: 'All Reviews', value: '' }, { label: 'Published Reviews', value: 'published' }, { label: 'Archived Reviews', value: 'archived' }]}
          handleSwitcher={handleFilter}
          />
          <Selector options={[
            { label: 'DATE', value: 'date' },
            { label: 'id', value: 'id' },
            { label: 'Customer', value: 'customer' }]} onChange={handleOrder}/>
        </>
      </Switcher>
      <Table>
        <>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Comment</th>
              {!filter && <th>Actions</th>}
          </tr>
          </thead>
          <tbody>
            {
              showReviews && showReviews.map(review => {
                return (
                  <tr key={review.id}>
                    <td>{review.id}</td>
                    <td className='date'>{review.date}</td>
                    <td>{review.customer}</td>
                    <td className='table__small'>{review.subject}</td>
                    {!filter &&
                      <td>
                        <div className='actions'>
                          <button className='publish'>Publish</button>
                          <button className='archive'>Archive</button>
                        </div>
                      </td>
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </>
      </Table>
      <Pagination items={reviewsState} itemsPerPage={4} setItems={setShowReviews}/>
    </ReviewsPageContainer>
  )
}

export default ContactPage
