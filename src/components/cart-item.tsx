import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import { TbTrash } from 'react-icons/tb'
import styled from 'styled-components'
import { Button } from './button'

interface CartItemProps {
  product: Product
  onRemove: (id: number) => void
}

export const CartItem = ({ product, onRemove }: CartItemProps) => {
  const handleRemove = () => {
    onRemove(product.id)
  }

  const formattedTitle = useFormatTitle(product.brand, product.model)

  return (
    <CartItemContainer>
      <CartItemDetails>
        <CartItemImage src={product.image} alt={product.title} />
        <CartItemTitle>{formattedTitle}</CartItemTitle>
      </CartItemDetails>
      <CartItemPrice>
        {product.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'USD',
        })}
      </CartItemPrice>
      <Button
        onClick={handleRemove}
        content={<TbTrash size={20} />}
        style={{ backgroundColor: 'red', border: 'none' }}
      />
    </CartItemContainer>
  )
}

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  color: black;
`

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

const CartItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`

const CartItemPrice = styled.p`
  font-size: 1.2rem;
`
