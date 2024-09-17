import { useState, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import {
  fetchAllProducts,
  fetchProductByCategory,
  fetchProductsByPage,
} from '@/services/api'
import type { Product } from '@/types/product'
import { Header } from '@/components/header'
import { Pagination, ChangePageButton } from '@/components/pagination'
import { Card } from '@/components/card'
import { ProductCard, ProductGrid } from '@/components/product-card'
import { AllProductsSkeleton } from '@/components/all-products-skeleton'
import { PopUp } from '@/components/pop-up'
import { PageNumbers } from '@/components/page-numbers'

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [scrolling, setScrolling] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  )
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage] = useState('Item adicionado ao carrinho!')
  const router = useRouter()
  const totalPages = 7

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

  useEffect(() => {
    if (scrolling) {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      const timeout = setTimeout(() => {
        setScrolling(false)
      }, 1000)
      setScrollTimeout(timeout)
    }
  }, [scrolling, scrollTimeout])

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
    if (keyword === '' && page < totalPages) {
      setScrolling(true)
      setPage(page + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePreviousPage = () => {
    if (keyword === '' && page > 1) {
      setScrolling(true)
      setPage(page - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToProductPage = (id: number) => {
    router.push(`/products/${id}`)
  }

  const handlePageClick = useCallback((pageNumber: number) => {
    setScrolling(true)
    setPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const filteredProducts = useMemo(() => {
    if (keyword) {
      return products.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase()),
      )
    }
    return products
  }, [products, keyword])

  const showAddToCartPopup = () => {
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 3000)
  }

  return (
    <div>
      <Header
        onKeywordChange={handleKeywordChange}
        onCategoryChange={handleCategoryChange}
      />
      {isLoading ? (
        <ProductGrid>
          {Array.from({ length: 24 }).map((_, index) => (
            <ProductCard key={index}>
              <AllProductsSkeleton />
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <>
          <ProductGrid>
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id}>
                <Card
                  product={product}
                  onClick={() => goToProductPage(product.id)}
                  onAddToCart={showAddToCartPopup}
                />
              </ProductCard>
            ))}
          </ProductGrid>
          {!keyword && !selectedCategory && (
            <Pagination>
              <ChangePageButton
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                <FaArrowCircleLeft color={'#fd3a3a'} />
              </ChangePageButton>
              <PageNumbers
                page={page}
                totalPages={totalPages}
                keyword={keyword}
                selectedCategory={selectedCategory}
                onPageClick={handlePageClick}
              />
              <ChangePageButton
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                <FaArrowCircleRight color={'#fd3a3a'} />
              </ChangePageButton>
            </Pagination>
          )}
        </>
      )}
      {showPopup && <PopUp>{popupMessage}</PopUp>}
    </div>
  )
}
