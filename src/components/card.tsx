import { useCartStore } from '@/context/cart-store'
import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import styled from 'styled-components'
import { Button } from './button'
import { BsCart } from 'react-icons/bs'

interface CardProps {
  product: Product
  onClick: () => void
}

export const Card = ({ product, onClick }: CardProps) => {
  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }))

  const maxDescriptionLength =
    product.description.length > 100
      ? `${product.description.substring(0, 100)}`
      : product.description

  const formattedTitle = useFormatTitle(product.brand, product.model)

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <Image src={product.image} alt="imagem do produto" fill />
      </ImageWrapper>
      <Title>{formattedTitle}</Title>
      <Description>{maxDescriptionLength}...</Description>
      <CardFooter>
        <Price>{`$${product.price}.00`}</Price>
        <Button
          onClick={(event) => handleAddToCart(event, product)}
          content={<BsCart />}
        />
      </CardFooter>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
  max-width: 300px;
  height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  cursor: pointer;
`

const ImageWrapper = styled.div`
  position: relative;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
`

const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 8px;
  color: #333;
`

const Description = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 16px;
`

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #050505;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
