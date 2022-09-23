import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
 border-radius: 12px;
 background-color: #135846;
 color: white;
 border: none;
 padding: 0.8125rem 2.1875rem;
 cursor: pointer;
`

const Button = ({ label, onClick }) => {
  return (
    <Btn onClick= {onClick}>
      {label}
    </Btn>
  )
}

export default Button
