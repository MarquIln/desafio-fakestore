import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'

interface CartItemProps {
  product: Product
  quantity: number
  onRemove: (id: number) => void
}

export const CartItem = ({ product, quantity, onRemove }: CartItemProps) => {
  const formattedTitle = useFormatTitle(product.brand, product.model)

  const price = Number(product.price) || 0
  const discount = Number(product.discount) || 0
  const validQuantity = Number(quantity) || 0

  const totalPrice = price * validQuantity

  let discountedPrice
  if (discount > 0) {
    discountedPrice = (price - price * (discount / 100)) * validQuantity
  }

  return (
    <CartWrapper>
      <CartItemWrapper>
        <ProductImage
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
        />
        <ProductInfo>
          <ProductTitle>{formattedTitle}</ProductTitle>
          <PriceWrapper>
            <ProductPrice>
              <span>Preço:</span>{' '}
              {discount > 0 ? (
                <>
                  <OriginalPrice>
                    {totalPrice.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </OriginalPrice>
                  <PriceWithDiscount>
                    {discountedPrice?.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </PriceWithDiscount>
                </>
              ) : (
                <BoldPrice>
                  {totalPrice.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </BoldPrice>
              )}
            </ProductPrice>
          </PriceWrapper>
          <ProductQuantity>Quantidade: {validQuantity}</ProductQuantity>
        </ProductInfo>
        <RemoveButton onClick={() => onRemove(product.id)}>
          <FaTrash />
        </RemoveButton>
      </CartItemWrapper>
    </CartWrapper>
  )
}

const CartWrapper = styled.div<{ theme: 'dark' | 'light' }>`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background: ${({ theme }) => theme.bg};
  border-radius: 10px;
  box-shadow: 0 4px 12px
    ${({ theme }) =>
      theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  box-sizing: border-box;
  overflow-x: auto;
`

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const ProductImage = styled(Image)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ProductInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  min-width: 0;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`

const ProductTitle = styled.h2<{ theme: 'dark' | 'light' }>`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PriceWrapper = styled.div`
  margin: 1rem 0;
`

const ProductPrice = styled.div<{ theme: 'dark' | 'light' }>`
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ddd' : '#333')};
`

const BoldPrice = styled.span`
  font-weight: bold;
`

const OriginalPrice = styled.span<{ theme: 'dark' | 'light' }>`
  text-decoration: line-through;
  color: ${({ theme }) => (theme === 'dark' ? '#888' : '#888')};
`

const PriceWithDiscount = styled.span<{ theme: 'dark' | 'light' }>`
  color: ${({ theme }) => (theme === 'dark' ? '#fd3a3a' : '#fd3a3a')};
  font-weight: bold;
  margin-left: 0.5rem;
`

const ProductQuantity = styled.p<{ theme: 'dark' | 'light' }>`
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ddd' : '#333')};
`

const RemoveButton = styled.button<{ theme: 'dark' | 'light' }>`
  background: none;
  border: none;
  color: ${({ theme }) => (theme === 'dark' ? '#fd3a3a' : '#fd3a3a')};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => (theme === 'dark' ? '#c9302c' : '#c9302c')};
  }
`
