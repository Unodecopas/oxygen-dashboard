import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
const PaginationContainer = styled.div`
margin: 1rem 0;
  display: flex;
  place-items: center;
  width: 100%;
  & .pagination__results{
    flex-grow: 1;
  }
  & .pagination__buttons {
    &__page {
      padding: 16px 16px;
      border-radius: 12px;
      border: none;
      background-color: #f8f8f8;
    }

    &__fixed {
      border-radius: 12px;
      padding: 16px 29px;
      color: #135846;
      border: 1px solid #135846;
      background-color: #FFFFFF;
    }
    & .active {
      background-color: #135846;
      color: white;
    }
  }
`

const Pagination = ({ itemsPerPage, items, setItems }) => {
  const [actualPage, setActualPage] = useState(0)

  const arraysSplitted = []
  for (let i = 0; i < items.length; i += itemsPerPage) {
    const piece = items.slice(i, i + itemsPerPage)
    arraysSplitted.push(piece)
  }
  console.log(arraysSplitted)
  useEffect(() => {
    setItems(arraysSplitted[actualPage])
  }, [])
  useEffect(() => {
    setItems(arraysSplitted[actualPage])
  }, [items])

  useEffect(() => {
    setItems(arraysSplitted[actualPage])
  }, [actualPage])

  const nextPage = () => {
    setActualPage(actualPage - 1)
  }
  const prevPage = () => {
    setActualPage(actualPage + 1)
  }
  return (
    <PaginationContainer>
      <div className='pagination__results'>
        <p>Showing {itemsPerPage * (actualPage + 1)} of {items.length} results</p>
      </div>
      <div className='pagination__buttons'>
        {actualPage > 0 && <button className='pagination__buttons__fixed' onClick={nextPage}>Prev</button>}
        <button className='pagination__buttons__page'>{actualPage + 1}</button>
        {actualPage < arraysSplitted.length - 1 && <button className='pagination__buttons__fixed' onClick={prevPage}>Next</button>}
      </div>
    </PaginationContainer>
  )
}

export default Pagination
