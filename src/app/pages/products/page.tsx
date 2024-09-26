'use client'

import { CategoriesSlider } from '@/components/categories-slider'
import { Header } from '@/components/header'
import { PageNumbers } from '@/components/page-numbers'
import { ChangePageButton, Pagination } from '@/components/pagination'
import { PopUp } from '@/components/pop-up'
import { ProductGrid } from '@/components/product-grid'
import { useProductStore } from '@/context/product-store'
import { useScrollToTop } from '@/hooks/use-scroll-up'
import {
  fetchAllProducts,
  fetchProductByCategory,
  fetchProductsByPage,
} from '@/services/product-api'
import type { Product } from '@/types/product'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)

  const router = useRouter()
  const totalPages = 5

  const { keyword, setKeyword, activatedCategory, setActivatedCategory } =
    useProductStore((state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
      activatedCategory: state.activatedCategory,
      setActivatedCategory: state.setActivatedCategory,
    }))

  const { handleScroll } = useScrollToTop(true)

  const getProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      if (activatedCategory && keyword) {
        const response = await fetchProductByCategory(activatedCategory)
        const filteredProducts = response.filter((product: Product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()),
        )
        setProducts(filteredProducts)
        return
      }

      if (activatedCategory) {
        const response = await fetchProductByCategory(activatedCategory)
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
  }, [page, keyword, activatedCategory])

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
    router.push(`/pages/products/${id}`)
    setActivatedCategory('')
    setKeyword('')
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
        onCategoryChange={setActivatedCategory}
      />
      <CategoriesSlider onCategoryChange={setActivatedCategory} />
      <ProductGrid
        products={products}
        onProductClick={goToProductPage}
        onAddToCart={showAddToCartPopup}
        isLoading={isLoading}
      />
      {!keyword && !activatedCategory && (
        <Pagination>
          <ChangePageButton onClick={handlePreviousPage} disabled={page === 1}>
            <FaArrowCircleLeft color={'#fd3a3a'} />
          </ChangePageButton>
          <PageNumbers
            page={page}
            totalPages={totalPages}
            onPageClick={handlePageClick}
            keyword={keyword || ''}
            selectedCategory={activatedCategory}
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
