import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'
import { DiscountTag } from './discount-tag'

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
        <ImageWrapper>
          {discount > 0 && <DiscountTag discount={''} />}
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
          />
        </ImageWrapper>
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
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  box-sizing: border-box;
  overflow-x: auto;
`

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
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

const ImageWrapper = styled.div`
  position: relative;
`

const ProductImage = styled(Image)`
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

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    white-space: normal;
    word-wrap: break-word;
    text-align: center;
    max-width: 100%;
  }
`

const PriceWrapper = styled.div`
  margin: 1rem 0;
`

const ProductPrice = styled.div`
  font-size: 1rem;
  color: #333;
`

const BoldPrice = styled.span`
  font-weight: bold;
`

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #888;
`

const PriceWithDiscount = styled.span`
  color: #fd3a3a;
  font-weight: bold;
  margin-left: 0.5rem;
`

const ProductQuantity = styled.p`
  font-size: 1rem;
  color: #333;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #fd3a3a;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #c9302c;
  }
`
