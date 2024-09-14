import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import { TbTrash } from 'react-icons/tb'
import styled from 'styled-components'

interface CartItemProps {
  product: Product
  onRemove: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
}

export const CartItem = ({
  product,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) => {
  const handleRemove = () => {
    onRemove(product.id)
  }

  const handleUpdateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateQuantity(product.id, Number(e.target.value))
  }

  const formattedTitle = useFormatTitle(product.brand, product.model)

  return (
    <CartItemContainer>
      <CartItemDetails>
        <CartItemTitle>{formattedTitle}</CartItemTitle>
        <CartItemPrice>
          {product.price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'USD',
          })}
        </CartItemPrice>
      </CartItemDetails>
      <QuantityInput type="number" onChange={handleUpdateQuantity} />
      <RemoveButton onClick={handleRemove}>
        <TbTrash size={20} />
      </RemoveButton>
    </CartItemContainer>
  )
}

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
`

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const CartItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`

const CartItemPrice = styled.p`
  font-size: 0.8rem;
  color: #666;
`

const QuantityInput = styled.input`
  max-width: 100px;
  height: 30px;
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  text-align: center;
`

const RemoveButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`
