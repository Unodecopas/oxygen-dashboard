import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.table`
  overflow-x: none;
  border-collapse: collapse;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  & thead{
    padding-top: 20px;
    & th {
      color: #393939;
      font-size: 1.125rem;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  & tbody {
    & tr {
      cursor: pointer;
      text-align: center;
    }
  }
  & tr {
    border-bottom: 1px solid #f7f7f7;
  }
  & th, td {
      padding: 20px 30px;
      text-align: center;
  }

  & td {
    color: #393939;
    font-size: 1rem;
    & img {
      width: 88px;
      height: 88px;
      margin-right: 23px;
    }
  }
  
`
const Table = ({ children }) => {
  return (
    <TableContainer>
      {children}
    </TableContainer>
  )
}

export default Table
