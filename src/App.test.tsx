import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from './components/Button'

describe('Button', () => {
  test('button has primary color', () => {
    const label = 'test'
    render(<Button label='test' onClick={() => console.log('hello')} primary/>)
    expect(screen.getByText(label)).toHaveStyle(`
    background-color: rgb(19, 88, 70)
  `)
  })

  test('button NOT has primary color', () => {
    render(<Button label='test' onClick={() => console.log('click')} />)
    expect(screen.getByText('test')).toHaveStyle(`
    background-color: grey
  `)
  })
})
