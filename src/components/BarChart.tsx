import React from 'react'
import styled from 'styled-components'

const D3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  place-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  & svg {
    width: 100%;
    height: 100%;
  }
`
interface Props {
  data: any[]
}
const BarChart = ({ data }: Props) => {
  return (
    <D3Container>
    </D3Container>
  )
}

export default BarChart
