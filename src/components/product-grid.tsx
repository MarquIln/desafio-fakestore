import type { Product } from '@/types/product'
import { AllProductsSkeleton } from './all-products-skeleton'
import { Card } from './card'
import styled from 'styled-components'

interface ProductGridProps {
  products: Product[]
  onProductClick: (id: number) => void
  onAddToCart: () => void
  isLoading: boolean
}

export const ProductGrid = ({
  products,
  onProductClick,
  onAddToCart,
  isLoading,
}: ProductGridProps) => {
  return (
    <ProductGridStyle>
      {isLoading
        ? Array.from({ length: 25 }).map((_, index) => (
            <ProductCard key={index}>
              <AllProductsSkeleton />
            </ProductCard>
          ))
        : products.map((product: Product) => (
            <ProductCard key={product.id}>
              <Card
                product={product}
                onClick={() => onProductClick(product.id)}
                onAddToCart={onAddToCart}
              />
            </ProductCard>
          ))}
    </ProductGridStyle>
  )
}

export const ProductGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 40px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
  }
`

export const ProductCard = styled.div`
  flex: 1 1 320px;
  box-sizing: border-box;
  padding: 0.75rem;
  background: ${({ theme }) => theme.bg};
  border-radius: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  height: auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
`
