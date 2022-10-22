import styled from 'styled-components'
import React from 'react'

const Select = styled.select`
  padding: 0.8125rem 2.1875rem;
  border: 1px solid #135846;
  border-radius: 12px;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.bgPrimary};
  &::after {
    color: gray;
  }
`
interface Option {
  label: String
  value: string
}
interface Props {
  options: Option[]
  onChange: (value: string) => void
}

const Selector = ({ options, onChange }: Props): JSX.Element => {
  return (
    <Select name='order' onChange={e => onChange(e.target.value)}>
      {options?.map((opt, i) => {
        return (
          <optgroup key={i}>
            <option value={opt.value}>{'⬆  ' + opt.label.toUpperCase()}</option>
            <option value={opt.value + 'DESC'}>{'⬇  ' + opt.label.toUpperCase()}</option>
          </optgroup>
        )
      })}
    </Select>
  )
}

export default Selector
