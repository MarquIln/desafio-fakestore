import { Header } from '@/components/header'
import { render } from '@testing-library/react'
import { useRouter } from 'next/router'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Header', () => {
  it('should render header', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })
  })

  render(<Header />)
})
