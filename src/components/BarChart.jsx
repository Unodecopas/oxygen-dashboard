import React from 'react'
import styled from 'styled-components'

const D3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  place-items: center;
  background-color: ${props => props.theme.colors.bgPrimary};
  color: ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 1rem;
  & svg {
    width: 100%;
    height: 100%;
  }
`
const BarChart = ({ data }) => {
  return (
    <D3Container>
    </D3Container>
  )
}

export default BarChart
