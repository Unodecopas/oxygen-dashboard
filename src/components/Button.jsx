import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  const Btn = styled.button`
 border-radius: 12px;
 background-color: ${props.primary ? '#135846' : 'grey'};
 color: white;
 border: none;
 padding: 0.8125rem 2.1875rem;
 cursor: pointer;
`
  return (
    <Btn onClick= {props.onClick}>
      {props.label}
    </Btn>
  )
}

export default Button
