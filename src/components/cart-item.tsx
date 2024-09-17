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

  const price = Number(product.price)
  const discount = Number(product.discount)
  const validQuantity = Number(quantity)

  if (isNaN(price) || isNaN(discount) || isNaN(validQuantity)) {
    return <div>Dados inválidos</div>
  }

  const totalPrice = price * validQuantity
  const discountedPrice = (price - price * (discount / 100)) * validQuantity

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
              <del>
                {totalPrice.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </del>
            </ProductPrice>
            {product.discount > 0 && (
              <PriceWithDiscount>
                {discountedPrice.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </PriceWithDiscount>
            )}
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
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: black;
`

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ProductImage = styled(Image)`
  border-radius: 8px;
`

const ProductInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
`

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`

const ProductPrice = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: black;

  del {
    color: #fd3a3a;
  }
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
  padding-right: 2rem;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin: 0;
  }
`

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PriceWithDiscount = styled.span`
  margin-left: 1rem;
  color: black;
  font-weight: bold;
`
