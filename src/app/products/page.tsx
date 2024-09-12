'use client'

import { Card } from '@/components/card'
import { Header } from '@/components/header'
import { fetchProductsByPage } from '@/services/api'
import type { Product } from '@/types/product'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import styled from 'styled-components'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const router = useRouter()

  const getAllProductsByPage = (page: number) => {
    fetchProductsByPage(page).then((response) => setProducts(response))
  }

  const goToProductPage = (id: number) => {
    router.push(`/products/${id}`)
  }

  useEffect(() => {
    getAllProductsByPage(page)
  }, [page])

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <Header />
      <ProductGrid>
        {products.length > 0 &&
          products.map((product) => (
            <Card
              key={product.id}
              product={product}
              onClick={() => goToProductPage(product.id)}
            />
          ))}
      </ProductGrid>
      <Pagination>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          <FaArrowCircleLeft />
        </button>
        <PageIndicator>{page}</PageIndicator>
        <button onClick={handleNextPage}>
          <FaArrowCircleRight />
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
  color: white;
  border: 1px solid white;
  border-radius: 10%;
  padding: 10px;
`
