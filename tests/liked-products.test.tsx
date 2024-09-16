import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { LikedProducts } from '@/components/liked-products'
import { Product } from '@/types/product'
import { fetchProductByCategory } from '@/services/api'
import { useRouter } from 'next/navigation'

jest.mock('@/services/api', () => ({
  fetchProductByCategory: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockRouter = jest.fn()

describe('LikedProducts component', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockRouter })
    ;(fetchProductByCategory as jest.Mock).mockResolvedValue([
      {
        id: 1,
        brand: 'Brand',
        model: 'Model',
        description: 'Description',
        image: 'image-url',
        price: 100,
        title: 'Product Title',
        category: 'Category',
      },
    ])
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
  }

  test('fetches and displays products with the same category', async () => {
    render(<LikedProducts product={product} />)
    await waitFor(() => {
      expect(screen.getByText(/Product Title/i)).toBeInTheDocument()
    })
  })

  test('scrolls left and right when nav buttons are clicked', async () => {
    render(<LikedProducts product={product} />)
    const leftButton = screen.getByRole('button', { name: /chevron left/i })
    const rightButton = screen.getByRole('button', { name: /chevron right/i })

    fireEvent.click(leftButton)
    fireEvent.click(rightButton)
  })

  test('navigates to product page when a product card is clicked', async () => {
    render(<LikedProducts product={product} />)
    const productCard = screen.getByText(/Product Title/i)
    fireEvent.click(productCard)
    expect(mockRouter).toHaveBeenCalledWith('/products/1')
  })
})
