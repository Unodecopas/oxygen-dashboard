import styled from 'styled-components'
import React from 'react'

const TableContainer = styled.table`
  overflow-x: none;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.bgPrimary};
  border-radius: 20px;
  width: 100%;
  max-width: 100%;
  height: 100%;
  & thead{
    padding-top: 20px;
    & th {
      color: ${props => props.theme.colors.primary};
      font-size: 1.125rem;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  & tbody {
    & tr {
      text-align: center;
    }
  }
  & tr {
    color: ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
  }
  & th, td {
      padding: 20px 30px;
      text-align: center;
  }
  & td {
    font-size: 1rem;
    & img {
      width: 88px;
      height: 88px;
      margin-right: 23px;
    }
  }
  
`

interface Props {
  children: JSX.Element
}

const Table = ({ children }: Props): JSX.Element => {
  return (
    <TableContainer>
      {children}
    </TableContainer>
  )
}

export default Table
