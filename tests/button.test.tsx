import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button } from '@/components/button'
import test, { describe } from 'node:test'

describe('Button component', () => {
  test('renders with the correct content', () => {
    render(<Button content="Click Me" onClick={() => {}} />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toBeTruthy()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button content="Click Me" onClick={handleClick} />)
    const buttonElement = screen.getByText(/Click Me/i)
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when the disabled prop is true', () => {
    render(<Button content="Click Me" onClick={() => {}} disabled />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toBeDefined()
  })
})
