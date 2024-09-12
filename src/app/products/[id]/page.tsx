'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import styled from 'styled-components'

export default function ProductPage() {
  const [product] = useState<Product | null>({
    id: 1,
    title: 'Product 1',
    description: 'Description of product 1',
    price: 100,
    image: '/images/product1.jpg',
    brand: 'Brand 1',
    model: 'Model 1',
  })
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div>
      <BackButton onClick={handleBack}>
        <FaArrowCircleLeft />
      </BackButton>
      {product ? (
        <ProductContainer>
          <ImageWrapper>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
            />
          </ImageWrapper>
          <Details>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <Price>{`$${product.price}`}</Price>
          </Details>
        </ProductContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0070f3;
  font-size: 1rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    text-decoration: underline;
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Details = styled.div`
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #050505;
`
