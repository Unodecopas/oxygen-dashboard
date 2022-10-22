import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

const PaginationContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  place-items: center;
  width: 100%;
  & .pagination__results{
    flex-grow: 1;
    color: ${props => props.theme.colors.primary};
  }
  & .pagination__buttons {
    color: ${props => props.theme.colors.primary};
    &__page {
      padding: 8px 16px;
      border-radius: 12px;
      border: none;
      margin-right: 10px;
      color: ${props => props.theme.colors.primary};
      background-color: ${props => props.theme.colors.secondary};
      &__active {
        padding: 8px 16px;
        border-radius: 12px;
        border: none;
        color: ${props => props.theme.button.primary};
        background-color: ${props => props.theme.button.bgPrimary};
        margin-right: 10px;
        border-bottom: 1px solid ${props => props.theme.button.bgPrimary};
      }
      &:hover {
        background-color: #135846;
        color: white;
      }
    }
    &__fixed {
      border-radius: 12px;
      padding: 8px 16px;
      color: ${props => props.theme.colors.primary};
      border: 1px solid #135846;
      background-color: ${props => props.theme.colors.bgPrimary};
      margin-right: 10px;
      transition:all 0.3s ease-out;
      &:hover {
        background-color: ${props => props.theme.button.bgPrimary};
        color: white;
      }
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

  useEffect(() => {
    setItems(arraysSplitted[actualPage])
  }, [])

  useEffect(() => {
    setItems(arraysSplitted[actualPage])
    setActualPage(0)
  }, [items])

  useEffect(() => {
    setItems(arraysSplitted[actualPage])
  }, [actualPage])

  const nextPage = () => {
    setActualPage(actualPage + 1)
  }
  const prevPage = () => {
    setActualPage(actualPage - 1)
  }

  return (
    <PaginationContainer>
      <div className='pagination__results'>
        {items.length === 0
          ? <p>Nothing to show</p>
          : <p>Showing {itemsPerPage * (actualPage + 1)} of {items.length} results</p>
        }
      </div>
      <div className='pagination__buttons'>
        {actualPage > 0 && <button className='pagination__buttons__fixed' onClick={() => setActualPage(0)}>{'<<'}</button>}
        {actualPage > 0 && <button className='pagination__buttons__fixed' onClick={prevPage}>{'<'}</button>}
        {actualPage > 1 && <button className='pagination__buttons__page' onClick={() => setActualPage(actualPage - 2)}>{actualPage - 1}</button>}
        {actualPage > 0 && <button className='pagination__buttons__page' onClick={() => setActualPage(actualPage - 1)}>{actualPage}</button>}
        <button className='pagination__buttons__page__active'>{actualPage + 1}</button>
        {(actualPage > 0 && actualPage < arraysSplitted.length - 1) && <button className='pagination__buttons__page' onClick={() => setActualPage(actualPage + 1)}>{actualPage + 2}</button>}
        {(actualPage > 1 && actualPage < arraysSplitted.length - 2) && <button className='pagination__buttons__page' onClick={() => setActualPage(actualPage + 2)}>{actualPage + 3}</button>}
        {actualPage < arraysSplitted.length - 1 && <button className='pagination__buttons__fixed' onClick={nextPage}>{'>'}</button>}
        {actualPage < arraysSplitted.length - 1 && <button className='pagination__buttons__fixed' onClick={() => setActualPage(arraysSplitted.length - 1)}>{'>>'}</button>}
      </div>
    </PaginationContainer>
  )
}

export default Pagination
