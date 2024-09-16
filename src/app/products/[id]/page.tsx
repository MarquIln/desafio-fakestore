'use client'

import { Header } from '@/components/header'
import { LikedProducts } from '@/components/liked-products'
import { useCartStore } from '@/context/cart-store'
import { useProductStore } from '@/context/product-store'
import { useFormatTitle } from '@/hooks/use-format-title'
import type { Product } from '@/types/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaShoppingCart } from 'react-icons/fa'
import styled from 'styled-components'
import { ProductPageSkeleton } from '@/components/product-page-skeleton'

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
    <>
      <Header />
      <BackButton onClick={handleBack}>
        <FaArrowCircleLeft size={40} />
      </BackButton>
      {loading ? (
        <ProductPageSkeleton />
      ) : product ? (
        <Page>
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
                <Category>
                  Categoria: <strong>{product.category}</strong>
                </Category>
                <ButtonContainer>
                  <Price>{`$ ${product.price}`}</Price>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    <FaShoppingCart /> Adicionar ao Carrinho
                  </AddToCartButton>
                </ButtonContainer>
              </Details>
            </ProductDetails>
          </ProductWrapper>
          <div>
            <h2 style={{ color: 'black' }}>
              Produtos que você pode gostar tambem:
            </h2>
            <LikedProducts product={product} />
          </div>
        </Page>
      ) : (
        <ErrorMessage>Produto não encontrado.</ErrorMessage>
      )}
    </>
  )
}

export default ProductPage

const Page = styled.div`
  padding: 20px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  &:hover {
    text-decoration: underline;
  }
`

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

const ProductDetails = styled.div`
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

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: red;
  text-align: center;
  margin-top: 50px;
`

const Category = styled.div`
  font-size: 1rem;
  color: black;
  margin-top: 20px;
`
