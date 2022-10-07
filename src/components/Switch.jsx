import styled from 'styled-components'
import React, { useState } from 'react'

const SwitchContainer = styled.div`
  & ul {
    display:flex;
    & li {
      padding: 13px 26px;
      font-size: 1rem;
      color: #6E6E6E;
      cursor:pointer;
      border-bottom: 1px solid grey;
    }
  }
  & .active {
    font-weight: bold;
    color: #135846;
    border-bottom: 2px solid #135846;
  }
`

const Switch = (props) => {
  const [active, setActive] = useState(props.items[0].label)

  const handleClick = (item) => {
    setActive(item.label)
    props.handleSwitcher(item.value)
  }

  return (
    <SwitchContainer>
      <ul>
        {props.items.map(item => {
          return <li key={item.label} onClick={() => handleClick(item)} className={`${active === item.label && 'active'}`}>{item.label}</li>
        })}
      </ul>
    </SwitchContainer>
  )
}

export default Switch
