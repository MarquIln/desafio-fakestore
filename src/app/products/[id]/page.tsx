'use client'

import { useProductStore } from '@/context/products-store'
import { useFormatTitle } from '@/hooks/use-format-title'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaArrowCircleLeft, FaShoppingCart } from 'react-icons/fa'
import styled from 'styled-components'
import Image from 'next/image'
import { useCartStore } from '@/context/cart-store'
import type { Product } from '@/types/product'

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { product, fetchProductById } = useProductStore((state) => ({
    product: state.product,
    fetchProductById: state.fetchProductById,
  }))
  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }))

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    alert(`${product.title} adicionado ao carrinho!`)
  }

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const formattedTitle = useFormatTitle(
    product?.brand || '',
    product?.model || '',
  )

  useEffect(() => {
    const id = parseInt(params.id)
    if (!isNaN(id)) {
      setLoading(true)
      console.log(id)
      fetchProductById(id).finally(() => setLoading(false))
    }
  }, [params.id, fetchProductById])

  const handleBack = () => {
    router.back()
  }

  return (
    <Main>
      <BackButton onClick={handleBack}>
        <FaArrowCircleLeft /> Voltar
      </BackButton>
      {loading ? (
        <LoadingIndicator>Carregando...</LoadingIndicator>
      ) : product ? (
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
          <ProductDetails>
            <Details>
              <Title>{formattedTitle}</Title>
              <div style={{ color: 'black' }}>Descrição</div>
              <Description>{product.description}</Description>
              <ButtonContainer>
                <Price>{`R$ ${product.price}`}</Price>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart /> Adicionar ao Carrinho
                </AddToCartButton>
              </ButtonContainer>
            </Details>
          </ProductDetails>
        </ProductWrapper>
      ) : (
        <ErrorMessage>Produto não encontrado.</ErrorMessage>
      )}
    </Main>
  )
}

export default ProductPage

const Main = styled.div`
  padding: 20px;
  margin: 0 auto;
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0070f3;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;

  &:hover {
    text-decoration: underline;
  }
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-basis: 50%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`

const ImageWrapper = styled.div`
  flex-basis: 50%;
  max-width: 600px;
  max-height: 600px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
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
  color: #0070f3;
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
  background-color: #0070f3;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`

const LoadingIndicator = styled.div`
  font-size: 1.5rem;
  color: #0070f3;
  text-align: center;
  margin-top: 50px;
`

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: red;
  text-align: center;
  margin-top: 50px;
`
