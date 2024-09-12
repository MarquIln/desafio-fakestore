import type { Product } from '@/types/product'
import Image from 'next/image'
import { BsCartPlus } from 'react-icons/bs'
import styled from 'styled-components'
import { Button } from './button'

interface CardProps {
  product: Product
  onClick: () => void
}

const formatTitle = (brand: string, model: string) => {
  const brandInModel = model.toLowerCase().includes(brand.toLowerCase())
  return brandInModel
    ? `${model}`
    : `${brand[0].toUpperCase() + brand.substring(1)} ${model}`
}

export const Card = ({ product, onClick }: CardProps) => {
  const maxDescriptionLength =
    product.description.length > 100
      ? `${product.description.substring(0, 100)}`
      : product.description

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <Image
          src={product.image}
          layout="fill"
          objectFit="cover"
          alt="imagem"
        />
      </ImageWrapper>
      <Title>{formatTitle(product.brand, product.model)}</Title>
      <Description>{maxDescriptionLength}...</Description>
      <CardFooter>
        <Price>{`$${product.price}`}</Price>
        <Button
          content={<BsCartPlus />}
          onClick={() => {
            console.log('Add to cart')
          }}
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
  max-height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
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
