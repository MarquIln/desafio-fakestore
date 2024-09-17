import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa' // Importa o ícone de lixeira

interface CartItemProps {
  product: Product
  quantity: number
  onRemove: (id: number) => void
}

export const CartItem = ({ product, quantity, onRemove }: CartItemProps) => {
  const formattedTitle = useFormatTitle(product.brand, product.model)

  return (
    <CartItemWrapper>
      <ProductImage
        src={product.image}
        alt={product.title}
        width={100}
        height={100}
      />
      <ProductInfo>
        <ProductTitle>{formattedTitle}</ProductTitle>
        <ProductPrice>
          Preço:{' '}
          {product.price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'USD',
          })}
        </ProductPrice>
        <ProductQuantity>Quantidade: {quantity}</ProductQuantity>
      </ProductInfo>
      <RemoveButton onClick={() => onRemove(product.id)}>
        <FaTrash />
      </RemoveButton>
    </CartItemWrapper>
  )
}

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
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
