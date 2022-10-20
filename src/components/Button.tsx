import React from 'react'
import styled from 'styled-components'

interface Props {
  primary?: boolean
  onClick?: (e: React.FormEvent)=> void
  id?: string
  label?: string
}

const Btn = styled.button<Props>`
 border-radius: 12px;
 background-color: ${props => props.primary ? '#135846' : '#eeeee'};
 color: white;
 border: none;
 padding: 0.8125rem 2.1875rem;
 cursor: pointer;
 transition:all 0.3s ease-out;
 &:hover {
  background-color: ${props => props.primary ? '#EBF1EF' : '#eeeee'};
  color: ${props => props.primary ? '#135846' : '#eeeee'};
 }
`


const Button = (props: Props) => {
  return (
    <Btn primary={props.primary} onClick= {props.onClick} id={props.id}>
      {props.label}
    </Btn>
  )
}

export default Button
