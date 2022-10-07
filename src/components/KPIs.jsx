import styled from 'styled-components'
import React from 'react'

const KPIsContainer = styled.div`
  display: flex;
  place-items: center;
  gap: 1rem;
  & .kpi {
    padding: 1rem;
    width: 100%;
    border-radius: 12px;
    background-color: white;
    display: flex;
    place-items: center;
    gap: 1rem;
    &__icon{
      place-items: center;
      background-color: #f8d7da;
      padding: 0.5rem;
      display: flex;
      border-radius: 10px;
    }
    &__text{
      display: flex;
      flex-direction: column;
      & p {
        font-size: 14px;
        color: #787878;
      }
    }
  }
`

const KPIs = ({ items }) => {
  return (
    <KPIsContainer>
      {items && items.map((item, i) => {
        return (
          <div className='kpi' key={i}>
            <div className='kpi__icon'>
              <img src={item.icon} alt="" />
            </div>
            <div className='kpi__text'>
              <h3>{item.value}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        )
      })}
    </KPIsContainer>
  )
}

export default KPIs
