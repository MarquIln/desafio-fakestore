import styled from 'styled-components'
import type { Product } from '@/types/product'
import Image from 'next/image'

interface CardProps {
  product: Product
}

export const Card = ({ product }: CardProps) => {
  const maxDescriptionLength =
    product.description.length > 100
      ? `${product.description.substring(0, 100)}`
      : product.description

  const maxTitleLength =
    product.title.length > 50
      ? `${product.title.substring(0, 50)}`
      : product.title

  return (
    <CardContainer>
      <ImageWrapper>
        <Image
          src={product.image}
          layout="fill"
          objectFit="cover"
          alt="imagem"
        />
      </ImageWrapper>
      <Title>{maxTitleLength}...</Title>
      <Description>{maxDescriptionLength}...</Description>
      <Price>{`$${product.price}`}</Price>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
  max-width: 300px;
  max-height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
`

const ImageWrapper = styled.div`
  position: relative;
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
  color: #27ae60;
`
