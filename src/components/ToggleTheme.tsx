import React from 'react'
import styled from 'styled-components'
const ToogleContainer = styled.div`
  display: flex;
  place-items:center ;
  .toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  margin: 0 0.75rem;
  & input[type="checkbox"] {
    display: none;
  }
  & .switch {
    position: absolute;
    cursor: pointer;
    background-color: #b6b6b6;
    border-radius: 25px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: background-color 0.2s ease;
  }
  & .switch::before {
    position: absolute;
    content: "";
    left: 2px;
    top: 2px;
    width: 21px;
    height: 21px;
    background-color: #333;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  & input[type="checkbox"]:checked + .switch::before {
    transform: translateX(25px);
    background-color: #333;
  }
  & input[type="checkbox"]:checked + .switch {
    background-color: #2bc6ff;
  }
}
`
interface Props {
  changeTheme: () => void
}
const ToggleTheme = ({ changeTheme }: Props): JSX.Element => {
  return (
    <ToogleContainer>
      <p>Light</p>
      <label className='toggle-switch'>
        <input type='checkbox' onChange={() => changeTheme()} />
        <span className='switch' />
      </label>
      <p>Dark</p>
    </ToogleContainer>
  )
}

export default ToggleTheme
