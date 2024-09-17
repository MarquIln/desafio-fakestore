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
        ? Array.from({ length: 24 }).map((_, index) => (
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 0.5rem;
  }
`

export const ProductCard = styled.div`
  flex: 1 1 200px;
  box-sizing: border-box;
  margin: 0.5rem;

  @media (max-width: 600px) {
    max-width: calc(100% - 1rem);

    padding: 0.5rem 2rem;
  }
`
