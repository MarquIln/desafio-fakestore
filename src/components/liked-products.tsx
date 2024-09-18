/* eslint-disable react-hooks/rules-of-hooks */
import { useFormatTitle } from '@/hooks/use-format-title'
import { fetchProductByCategory } from '@/services/api'
import type { Product } from '@/types/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styled from 'styled-components'

interface LikedProductsProps {
  product: Product
}

export const LikedProducts = ({ product }: LikedProductsProps) => {
  const [likedProducts, setLikedProducts] = useState<Product[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const getAllProductsWithSameCategory = async () => {
    const getSameCategory = product.category
    const products = await fetchProductByCategory(getSameCategory)
    setLikedProducts(products)
  }

  getAllProductsWithSameCategory()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const goToProductPage = (id: number) => {
    router.push(`/products/${id}`)
  }

  return (
    <div>
      <ScrollContainer>
        <NavButton onClick={() => scroll('left')}>
          <FaChevronLeft />
        </NavButton>
        <ProductsWrapper ref={scrollRef}>
          {likedProducts.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() => goToProductPage(product.id)}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                objectFit="contain"
              />
              <ProductTitle>
                {useFormatTitle(product.brand, product.model)}
              </ProductTitle>
              <ProductPrice>
                ${' '}
                {product.price -
                  (product.price * (product.discount || 0)) / 100}
              </ProductPrice>
            </ProductCard>
          ))}
        </ProductsWrapper>
        <NavButton onClick={() => scroll('right')}>
          <FaChevronRight />
        </NavButton>
      </ScrollContainer>
    </div>
  )
}

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const ProductsWrapper = styled.div`
  display: flex;
  gap: 3rem;
  overflow-x: hidden;
  scroll-behavior: smooth;
  max-width: 100%;
  padding: 1rem;
`

const NavButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: black;
  &:hover {
    color: gray;
  }
`

const ProductCard = styled.div`
  min-width: 220px;
  text-align: center;
  cursor: pointer;
`

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: black;
`

const ProductPrice = styled.p`
  font-size: 1rem;
  margin: 0;
  color: black;
`
