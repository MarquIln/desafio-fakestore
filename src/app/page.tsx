'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/card'
import styled from 'styled-components'
import { Product } from '@/types/product'
import { fetchProductsByPage } from '@/services/api'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)

  const getAllProductsByPage = (page: number) => {
    fetchProductsByPage(page).then((response) => setProducts(response))
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
      <h1>Products</h1>
      <ProductGrid>
        {products.length > 0 &&
          products.map((product) => (
            <Card key={product.id} product={product} />
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
