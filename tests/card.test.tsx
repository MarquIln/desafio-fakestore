import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Card } from '@/components/card'
import { useCartStore } from '@/context/cart-store'
import { Product } from '@/types/product'

jest.mock('@/context/cart-store', () => ({
  useCartStore: jest.fn(),
}))

const mockAddToCart = jest.fn()

describe('Card component', () => {
  beforeEach(() => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    })
  })

  const product: Product = {
    id: 1,
    brand: 'Brand',
    model: 'Model',
    description:
      'A very long description that should be truncated for testing purposes.',
    image: 'image-url',
    price: 100,
    title: 'Product Title',
    category: 'Category',
  }

  test('renders product details correctly', () => {
    render(<Card product={product} onClick={() => {}} />)
    expect(screen.getByText(/Brand Model/i)).toBeInTheDocument()
    expect(screen.getByText(/\$100/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /A very long description that should be truncated for testing purposes\.\.\./i,
      ),
    ).toBeInTheDocument()
  })

  test('calls onClick handler when the card is clicked', () => {
    const handleClick = jest.fn()
    render(<Card product={product} onClick={handleClick} />)
    const cardElement = screen.getByRole('button')
    fireEvent.click(cardElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('calls addToCart when the add to cart button is clicked', () => {
    render(<Card product={product} onClick={() => {}} />)
    const buttonElement = screen.getByRole('button', { name: /cart/i })
    fireEvent.click(buttonElement)
    expect(mockAddToCart).toHaveBeenCalledWith(product)
  })
})
