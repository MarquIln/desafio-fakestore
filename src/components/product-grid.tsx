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
    <Container>
      <ProductGridStyle maxWidth="100%">
        {isLoading ? (
          Array.from({ length: 30 }).map((_, index) => (
            <ProductCard key={index}>
              <AllProductsSkeleton />
            </ProductCard>
          ))
        ) : products.length === 0 ? (
          <NoProductsMessage>Nenhum produto encontrado.</NoProductsMessage>
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product.id}>
              <Card
                product={product}
                onClick={() => onProductClick(product.id)}
                onAddToCart={onAddToCart}
              />
            </ProductCard>
          ))
        )}
      </ProductGridStyle>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`

const ProductGridStyle = styled.div<{ maxWidth: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  justify-content: center;

  max-width: ${({ maxWidth }) => maxWidth};

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    padding: 1rem;
  }
`

const ProductCard = styled.div`
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

const NoProductsMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 100px 20px;
  color: #000;
  font-size: 1.5rem;
`
