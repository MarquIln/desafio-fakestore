'use client'

import { Card } from '@/components/card'
import { Header } from '@/components/header'
import {
  fetchAllProducts,
  fetchProductByCategory,
  fetchProductsByPage,
} from '@/services/api'
import type { Product } from '@/types/product'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import styled from 'styled-components'

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  const getProducts = useCallback(async () => {
    if (selectedCategory) {
      const response = await fetchProductByCategory(selectedCategory)
      setProducts(response)
    } else if (keyword) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase()),
      )
      setProducts(filteredProducts)
    } else if (page) {
      const response = await fetchProductsByPage(page)
      setProducts(response)
    } else {
      const response = await fetchAllProducts()
      setProducts(response)
    }
  }, [page, keyword, selectedCategory, products])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword)
    setPage(1)
    if (keyword === '') {
      setSelectedCategory(null)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setKeyword('')
    setPage(1)
  }

  const handleNextPage = () => {
    if (keyword === '' && page) {
      setPage(page + 1)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePreviousPage = () => {
    if (keyword === '' && page && page > 1) {
      setPage(page - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToProductPage = (id: number) => {
    router.push(`/products/${id}`)
  }

  return (
    <div>
      <Header
        onKeywordChange={handleKeywordChange}
        onCategoryChange={handleCategoryChange}
      />
      <ProductGrid>
        {products?.map((product) => (
          <ProductCard key={product.id}>
            <Card
              product={product}
              onClick={() => goToProductPage(product.id)}
            />
          </ProductCard>
        ))}
      </ProductGrid>
      <Pagination>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          <FaArrowCircleLeft color={'#fd3a3a'} />
        </button>
        <PageIndicator>{page}</PageIndicator>
        <button onClick={handleNextPage}>
          <FaArrowCircleRight color={'#fd3a3a'} />
        </button>
      </Pagination>
    </div>
  )
}

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`

const PageIndicator = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #fd3a3a;
  border: 1px solid #fd3a3a;
  border-radius: 10%;
  padding: 5px;
`

const ProductCard = styled.div`
  position: relative;
`
