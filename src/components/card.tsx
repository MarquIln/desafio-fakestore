import styled from 'styled-components'
import { Button } from './button'
import { BsCart } from 'react-icons/bs'
import Image from 'next/image'
import { useCartStore } from '@/context/cart-store'
import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import { DiscountTag } from './discount-tag'

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

  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <Image
          src={product.image}
          alt="imagem do produto"
          layout="cover"
          width={200}
          height={200}
        />
        {product.discount && product.discount > 0 && (
          <DiscountTag discount={product.discount} />
        )}
      </ImageWrapper>
      <Title>{formattedTitle}</Title>
      <Description>{maxDescriptionLength}...</Description>
      <CardFooter>
        <PriceContainer>
          {product.discount && product.discount > 0 && (
            <OriginalPrice>
              {product.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'USD',
              })}
            </OriginalPrice>
          )}
          <CurrentPrice hasDiscount={!!product.discount}>
            {discountedPrice.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'USD',
            })}
          </CurrentPrice>
        </PriceContainer>
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
`

const ImageWrapper = styled.div`
  position: relative;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 40px;

  @media (max-width: 769px) {
    margin-left: 45px;
  }
`

const Title = styled.h2`
  font-size: 1rem;
  color: var(--headingcolor);
`

const Description = styled.p`
  font-size: 0.8rem;
  color: var(--fg);
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`

const OriginalPrice = styled.p`
  font-size: 1rem;
  color: var(--fg);
  text-decoration: line-through;
  margin-right: 8px;
`

const CurrentPrice = styled.p<{ hasDiscount: boolean }>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ hasDiscount }) => (hasDiscount ? 'red' : 'black')};
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
