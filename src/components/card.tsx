import styled from 'styled-components'
import { Button } from './button'
import { BsCart } from 'react-icons/bs'
import Image from 'next/image'
import { useCartStore } from '@/context/cart-store'
import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'

interface CardProps {
  product: Product
  onClick: () => void
  onAddToCart: (product: Product) => void
}

export const Card = ({ product, onClick, onAddToCart }: CardProps) => {
  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }))

  const maxDescriptionLength =
    product.description.length > 100
      ? `${product.description.substring(0, 100)}`
      : product.description

  const formattedTitle = useFormatTitle(product.brand, product.model)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product)
    addToCart(product)
  }

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <Image
          src={product.image}
          alt="imagem do produto"
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <Title>{formattedTitle}</Title>
      <Description>{maxDescriptionLength}...</Description>
      <CardFooter>
        <Price>
          {product.price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'USD',
          })}
        </Price>
        <Button onClick={handleAddToCart} content={<BsCart />} />
      </CardFooter>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  border-radius: 10px;
  background-color: var(--bg);
  max-width: 300px;
  height: 400px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
`

const ImageWrapper = styled.div`
  position: relative;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 40px;

  @media (max-width: 769px) {
    margin-left: 45px;
  }
`

const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 8px;
  color: var(--headingcolor);
`

const Description = styled.p`
  font-size: 0.8rem;
  color: var(--fg);
  margin-bottom: 16px;
`

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--fg);
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
