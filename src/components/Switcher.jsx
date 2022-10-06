import React from 'react'
import styled from 'styled-components'

const SwitcherContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  & div {
    flex-grow: 1;
  }
  & button {
    margin-right: 1.25rem;
  }
`
const Switcher = ({ children }) => {
  return (
    <SwitcherContainer>{children}</SwitcherContainer>
  )
}

export default Switcher
