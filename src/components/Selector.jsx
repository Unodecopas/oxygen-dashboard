import React from 'react'
import styled from 'styled-components'

const Select = styled.select`
  padding: 0.8125rem 2.1875rem;
  border: 1px solid #135846;
  border-radius: 12px;
  color: #135846;
  &::after {
    color: gray;
  }
`
const Selector = ({ options }) => {
  return (
    <Select name='order'>
      { options && options.map((opt, i) => {
        return (
          <option key={i} value={opt}>{opt}</option>
        )
      })}
    </Select>
  )
}

export default Selector
