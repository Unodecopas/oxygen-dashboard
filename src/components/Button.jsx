import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
 border-radius: 12px;
 background-color: ${props => props.primary ? '#135846' : 'grey'};
 color: white;
 border: none;
 padding: 0.8125rem 2.1875rem;
 cursor: pointer;
`
const Button = (props) => {
  return (
    <Btn primary={props.primary} onClick= {props.onClick} id={props.id}>
      {props.label}
    </Btn>
  )
}

export default Button
