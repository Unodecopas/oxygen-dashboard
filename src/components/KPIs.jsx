import styled from 'styled-components'
import React from 'react'

const KPIsContainer = styled.div`
  display: flex;
  place-items: center;
  gap: 1rem;
  & .kpi {
    padding: 1rem;
    width: 100%;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.colors.bgPrimary};
    display: flex;
    place-items: center;
    gap: 1rem;
    &__icon{
      place-items: center;
      background-color: #f8d7da;
      padding: 0.5rem;
      display: flex;
      border-radius: ${props => props.theme.borderRadiusSmall};
    }
    &__text{
      display: flex;
      flex-direction: column;
      & h3 {
        color: ${props => props.theme.colors.primary};
      }
      & p {
        font-size: 14px;
        color: #787878;
      }
    }
    &:hover {
      box-shadow: ${props => props.theme.boxShadow};
      transform: translate(2px, -2px);
      transition:all 0.5s ease-out;
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
