import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CartItem } from '@/components/cart-item'
import { Product } from '@/types/product'

describe('CartItem component', () => {
  const product: Product = {
    id: 1,
    brand: 'Brand',
    model: 'Model',
    description: 'Description',
    image: 'image-url',
    price: 100,
    title: 'Product Title',
    category: 'Category',
  }

  test('renders product details correctly', () => {
    render(<CartItem product={product} onRemove={() => {}} />)
    expect(screen.getByText(/Brand Model/i)).toBeInTheDocument()
    expect(screen.getByText(/\$100/i)).toBeInTheDocument()
  })

  test('calls onRemove handler when the remove button is clicked', () => {
    const handleRemove = jest.fn()
    render(<CartItem product={product} onRemove={handleRemove} />)
    const buttonElement = screen.getByRole('button', { name: /trash/i })
    fireEvent.click(buttonElement)
    expect(handleRemove).toHaveBeenCalledWith(product.id)
  })
})
