import React, { useEffect, useState } from 'react'
import Switch from '../components/Switch'
import Switcher from '../components/Switcher'
import Selector from '../components/Selector'
import Table from '../components/Table'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchReviews, selectReviewsList } from '../slices/reviewsListSlice'

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
const ContactPage = () => {
  const [filter, setFilter] = useState('')
  const reviews = useSelector(selectReviewsList)
  const dispatch = useDispatch()
  const [firtsReviews, setFirstsReviews] = useState([])
  const [orderBy, setOrderBy] = useState('date')
  const [searchTerm] = useState('')
  const [reviewsState, setReviewsState] = useState([])

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch, fetchReviews])

  useEffect(() => {
    const firsts = reviews.slice(-5)
    setFirstsReviews(firsts)
  }, [reviews])

  useEffect(() => {
    const filteredReviews = filter !== '' ? reviews.filter(review => review.status === filter) : reviews
    const orderedFilteredReviews = filteredReviews.filter(review => review.customer.includes(searchTerm))

    if (orderBy === 'date') {
      orderedFilteredReviews.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return 1
        } else if (a[orderBy] > b[orderBy]) {
          return -1
        }
        return 0
      })
    } else {
      orderedFilteredReviews.sort((a, b) => {
        if (a[orderBy] > b[orderBy]) {
          return 1
        } else if (a[orderBy] < b[orderBy]) {
          return -1
        }
        return 0
      })
    }
    setReviewsState(orderedFilteredReviews)
  }, [reviews, orderBy, searchTerm, filter])

  const handleFilter = (filter) => {
    setFilter(filter)
  }
  const handleOrder = (value) => {
    setOrderBy(value)
  }

  return (
    <ReviewsPageContainer>
      <div className='notices'>
      {
        firtsReviews.map(review => {
          return (
            <div key={review.id} className='notice'>
              <p className='notice__subject'>{'" ' + review.subject + ' "'}</p>
              <p>{review.customer}</p>
              <p>{review.date}</p>
            </div>
          )
        })
      }
      </div>
      <Switcher>
        <Switch
        items={[{ label: 'All Reviews', value: '' }, { label: 'Published Reviews', value: 'published' }, { label: 'Archived Reviews', value: 'archived' }]}
        handleSwitcher={handleFilter}
        />
        <Selector options={['date', 'id', 'customer']} onChange={handleOrder}/>

      </Switcher>
      <Table>
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
            reviewsState && reviewsState.map(review => {
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
      </Table>
    </ReviewsPageContainer>
  )
}

export default ContactPage
