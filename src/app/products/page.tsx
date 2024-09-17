'use client'

import { Header } from '@/components/header'
import { PageNumbers } from '@/components/page-numbers'
import { ChangePageButton, Pagination } from '@/components/pagination'
import { PopUp } from '@/components/pop-up'
import { ProductGrid } from '@/components/product-grid'
import { useScrollToTop } from '@/hooks/use-scroll-up'
import {
  fetchAllProducts,
  fetchProductByCategory,
  fetchProductsByPage,
} from '@/services/api'
import type { Product } from '@/types/product'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()
  const totalPages = 7
  const { handleScroll } = useScrollToTop(true)

  const getProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      if (selectedCategory) {
        const response = await fetchProductByCategory(selectedCategory)
        setProducts(response)
        return
      }
      if (keyword) {
        const allProducts = await fetchAllProducts()
        const filteredProducts = allProducts.filter((product: Product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()),
        )
        setProducts(filteredProducts)
        return
      }
      if (page) {
        const response = await fetchProductsByPage(page)
        setProducts(response)
        return
      }
      const response = await fetchAllProducts()
      setProducts(response)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [page, keyword, selectedCategory])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const handleNextPage = () => {
    if (keyword === '' && page < totalPages) {
      handleScroll()
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (keyword === '' && page > 1) {
      handleScroll()
      setPage(page - 1)
    }
  }

  const goToProductPage = (id: number) => {
    router.push(`/products/${id}`)
  }

  const handlePageClick = useCallback(
    (pageNumber: number) => {
      handleScroll()
      setPage(pageNumber)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [handleScroll],
  )

  const showPopupForDuration = (duration: number) => {
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), duration)
  }

  const showAddToCartPopup = () => showPopupForDuration(3000)

  return (
    <div>
      <Header
        onKeywordChange={setKeyword}
        onCategoryChange={setSelectedCategory}
      />
      <ProductGrid
        products={products}
        onProductClick={goToProductPage}
        onAddToCart={showAddToCartPopup}
        isLoading={isLoading}
      />
      {!keyword && !selectedCategory && (
        <Pagination>
          <ChangePageButton onClick={handlePreviousPage} disabled={page === 1}>
            <FaArrowCircleLeft color={'#fd3a3a'} />
          </ChangePageButton>
          <PageNumbers
            page={page}
            totalPages={totalPages}
            onPageClick={handlePageClick}
            keyword={keyword}
            selectedCategory={selectedCategory}
          />
          <ChangePageButton
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            <FaArrowCircleRight color={'#fd3a3a'} />
          </ChangePageButton>
        </Pagination>
      )}
      {showPopup && <PopUp>Produto adicionado ao carrinho</PopUp>}
    </div>
  )
}
