'use client'

import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import styled from 'styled-components'

interface ProductDetailsProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export const ProductDetails = ({
  product,
  onAddToCart,
}: ProductDetailsProps) => {
  const formattedTitle = useFormatTitle(product.brand, product.model)

  return (
    <ProductWrapper>
      <ImageWrapper>
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          objectFit="contain"
        />
      </ImageWrapper>
      <ProductDetailsContainer>
        <Details>
          <Title>{formattedTitle}</Title>
          <div style={{ color: 'black' }}>Descrição</div>
          <Description>{product.description}</Description>
          <Category>
            Categoria: <strong>{product.category}</strong>
          </Category>
          <ButtonContainer>
            <Price>{`$ ${product.price}`}</Price>
            <AddToCartButton onClick={() => onAddToCart(product)}>
              <FaShoppingCart /> Adicionar ao Carrinho
            </AddToCartButton>
          </ButtonContainer>
        </Details>
      </ProductDetailsContainer>
    </ProductWrapper>
  )
}

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border: 2px solid #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-basis: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`

const ImageWrapper = styled.div`
  max-width: 600px;
  max-height: 600px;

  img {
    width: 100%;
    height: auto;
    object-fit: fill;
  }

  @media (max-width: 768px) {
    flex-basis: 100%;
    max-width: 100%;
    max-height: auto;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 15px;
`

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fd3a3a;
  margin-bottom: 15px;
`

const Description = styled.p`
  font-size: 1rem;
  margin-left: 20px;
  color: #666;
  margin-bottom: 20px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ButtonContainer = styled.div`
  margin-top: auto;
  flex-direction: row;
`

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #fd3a3a;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ce3131;
  }
`

const Category = styled.div`
  font-size: 1rem;
  color: black;
  margin-top: 20px;
`
