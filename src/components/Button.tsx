import React from 'react'
import styled from 'styled-components'

interface Props {
  primary?: boolean
  onClick?: (e: React.FormEvent) => void
  id?: string
  label?: string
}

const Btn = styled.button<Props>`
 border-radius: 12px;
 background-color: ${props => (props.primary === true) ? props.theme.button.bgPrimary : props.theme.button.bgSecondary};
 color: ${props => props.theme.button.primary};
 border: 1px solid ${props => (props.primary === true) ? props.theme.button.bgPrimary : props.theme.colors.bgPrimary};
 padding: ${props => props.theme.button.padding};
 transition:all 0.3s ease-out;
 &:hover {
  border: 1px solid ${props => props.theme.button.bgPrimary};
  background-color: ${props => props.theme.colors.bgSpecial};
  color: ${props => props.theme.button.secondary};
 }
`

const Button = (props: Props): JSX.Element => {
  return (
    <Btn primary={props.primary} onClick={props.onClick} id={props.id}>
      {props.label}
    </Btn>
  )
}

export default Button
