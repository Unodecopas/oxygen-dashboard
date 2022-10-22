import React from 'react'
import styled from 'styled-components'

interface Props {
  items: Item[]
  handleNotice: (number: number) => void
}
interface Item {
  id: number
  subject: string
  customer: string
  date: string
}
const NoticesContainer = styled.div`
  display: flex;
  gap: 1rem;
  .notice {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    background-color: ${props => props.theme.colors.bgPrimary};
    color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease-out;
  }
  .notice__subject {
    flex-grow: 1;
    font-size: 12px;
    font-style: italic;
  }
  .notice:hover {
    cursor: pointer;
    box-shadow: 0px 16px 30px #00000014;
    transform: translateY(-5px);
  }
`
const Notices = ({ items, handleNotice }: Props): JSX.Element => {
  return (
    <NoticesContainer>
      {
       items?.map(item => {
         return (
           <div key={item.id} className='notice' onClick={() => handleNotice(item.id)}>
             <p className='notice__subject'>{`" ${item.subject} "`}</p>
             <p>{item.customer}</p>
             <p>{item.date}</p>
           </div>
         )
       })
      }
    </NoticesContainer>
  )
}

export default Notices
