import React from 'react'
import styled from 'styled-components'
const PaginationContainer = styled.div`
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

const Pagination = ({ itemsPerPage, totalResults, totalPages, actualPage, setPage }) => {
  return (
    <PaginationContainer>
      <div className='pagination__results'>
        <p>Showing {itemsPerPage} of {totalResults} results</p>
      </div>
      <div className='pagination__buttons'>
        {actualPage > 0 && <button className='pagination__buttons__fixed' onClick={() => setPage(actualPage - 1)}>Prev</button>}
        {
          [...Array(totalPages)].map((element, index) => (
            <button
            className={`pagination__buttons__page ${actualPage === index && 'active'}`}
              key={index}
              onClick={() => setPage(index)}
            >{index + 1}</button>
          ))
        }
        {actualPage < totalPages - 1 && <button className='pagination__buttons__fixed' onClick={() => setPage(actualPage + 1)}>Next</button>}
      </div>
    </PaginationContainer>
  )
}

export default Pagination
