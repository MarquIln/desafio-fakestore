import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ProductPage from '@/app/products/[id]/page'
import { useProductStore } from '@/context/product-store'
import { useCartStore } from '@/context/cart-store'

jest.mock('@/context/product-store', () => ({
  useProductStore: jest.fn(),
}))
jest.mock('@/context/cart-store', () => ({
  useCartStore: jest.fn(),
}))

const mock = new MockAdapter(axios)

describe('ProductPage Integration Test', () => {
  beforeEach(() => {
    mock.reset()
  })

  it('should display the product details when API returns a product', async () => {
    const mockProduct = {
      id: 1,
      title: 'Sample Product',
      brand: 'BrandName',
      model: 'ModelName',
      description: 'A great product',
      price: 99.99,
      category: 'electronics',
      image: '/sample-image.jpg',
    }

    mock.onGet(`https://fakestoreapi.in/api/products/1`).reply(200, mockProduct)
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      product: mockProduct,
      fetchProductById: jest.fn(),
    })
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
    })

    render(<ProductPage params={{ id: '1' }} />)

    await waitFor(() => {
      expect(screen.getByText('Sample Product')).toBeInTheDocument()
      expect(screen.getByText('$ 99.99')).toBeInTheDocument()
      expect(screen.getByAltText('Sample Product')).toBeInTheDocument()
    })
  })

  it('should display loading skeleton while fetching product', () => {
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      product: null,
      fetchProductById: jest.fn(),
    })
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
    })

    render(<ProductPage params={{ id: '1' }} />)

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('should show error message if product not found', async () => {
    mock.onGet(`https://fakestoreapi.in/api/products/999`).reply(404)
    ;(useProductStore as unknown as jest.Mock).mockReturnValue({
      product: null,
      fetchProductById: jest.fn(),
    })
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
    })

    render(<ProductPage params={{ id: '999' }} />)

    await waitFor(() => {
      expect(screen.getByText('Produto não encontrado.')).toBeInTheDocument()
    })
  })
})
