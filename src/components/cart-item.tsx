import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import styled from 'styled-components'
import Image from 'next/image'
import { TbTrash } from 'react-icons/tb'

interface CartItemProps {
  product: Product
  onRemove: (id: number) => void
}

export const CartItem = ({ product, onRemove }: CartItemProps) => {
  const formattedTitle = useFormatTitle(product.brand, product.model)

  return (
    <CartItemContainer>
      <CartItemDetails>
        <Image
          src={product.image}
          alt={`Imagem do ${product.brand} ${product.model}`}
          width={100}
          height={100}
          style={{ borderRadius: '8px', objectFit: 'cover' }}
        />
        <CartItemText>
          <CartItemTitle>{formattedTitle}</CartItemTitle>
          <CartItemPrice>
            {product.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'USD',
            })}
          </CartItemPrice>
        </CartItemText>
        <RemoveButton onClick={() => onRemove(product.id)}>
          <TbTrash />
        </RemoveButton>
      </CartItemDetails>
    </CartItemContainer>
  )
}

const CartItemContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  color: black;
  border-radius: 8px;
  background-color: #fff;
`

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  width: 100%;
`

const CartItemText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const CartItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  color: #333;
`

const CartItemPrice = styled.p`
  font-size: 1.2rem;
  margin: 5px 0 0;
  color: #555;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ff6b6b;
  transition: color 0.3s ease;
  padding-right: 20px;

  &:hover {
    color: #ff4d4d;
  }
`
