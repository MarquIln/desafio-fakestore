import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Card } from '@/components/card'
import { useCartStore } from '@/context/cart-store'
import { Product } from '@/types/product'

jest.mock('@/context/cart-store', () => ({
  useCartStore: jest.fn(),
}))

const mockAddToCart = jest.fn()

beforeEach(() => {
  ;(useCartStore as unknown as jest.Mock).mockReturnValue({
    addToCart: mockAddToCart,
  })
})

const product: Product = {
  id: 1,
  brand: 'Brand',
  model: 'Model',
  description: 'Description',
  image: 'image-url',
  price: 100,
  title: 'Product Title',
  category: 'Category',
  color: 'Color',
  discount: 10,
}

test('renders product details and handles click events', () => {
  const handleClick = jest.fn()
  render(
    <Card
      product={product}
      onClick={handleClick}
      onAddToCart={() => console.log('oi')}
    />,
  )

  expect(screen.getByText(/Brand Model/i)).toBeInTheDocument()
  expect(screen.getByText(/\$100/i)).toBeInTheDocument()
  expect(screen.getByText(/Description/i)).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)

  fireEvent.click(screen.getByRole('button', { name: /cart/i }))
  expect(mockAddToCart).toHaveBeenCalledWith(product)
})
