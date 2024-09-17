import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'

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

const CartWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: black;
  box-sizing: border-box;
  overflow-x: auto;
`

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
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

const ProductImage = styled(Image)`
  border-radius: 8px;
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
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

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProductPrice = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: black;
`

const OriginalPrice = styled.del`
  color: #fd3a3a;
  font-weight: bold;
  margin-right: 1rem;
`

const PriceWithDiscount = styled.span`
  color: black;
  font-weight: bold;
`

const BoldPrice = styled.span`
  color: black;
  font-weight: bold;
`

const ProductQuantity = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`

const RemoveButton = styled.button`
  background-color: transparent;
  color: #fd3a3a;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin: 0;
  }
`
