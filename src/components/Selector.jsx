import styled from 'styled-components'
import React from 'react'

const Select = styled.select`
  padding: 0.8125rem 2.1875rem;
  border: 1px solid #135846;
  border-radius: 12px;
  color: #135846;
  &::after {
    color: gray;
  }
`
const Selector = ({ options, onChange }) => {
  return (
    <Select name='order' onChange={e => onChange(e.target.value)}>
      { options && options.map((opt, i) => {
        return <option key={i} value={opt}>{opt.toUpperCase()}</option>
      })}
    </Select>
  )
}

export default Selector
