'use client'

import { Header } from '@/components/header'
import { LikedProducts } from '@/components/liked-products'
import { useCartStore } from '@/context/cart-store'
import { useProductStore } from '@/context/product-store'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PopUp } from '@/components/pop-up'
import { ProductDetails } from '@/components/product-details'
import { CategoriesSlider } from '@/components/categories-slider'
import { useRouter } from 'next/navigation'
import { ProductPageSkeleton } from '@/components/product-page-skeleton'

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true)
  const [showPopUp, setShowPopUp] = useState(false)

  const { product, fetchProductById, setKeyword, setActivatedCategory } =
    useProductStore((state) => state)
  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }))

  const router = useRouter()

  useEffect(() => {
    const id = parseInt(params.id)
    if (id) {
      setLoading(true)
      fetchProductById(id).finally(() => setLoading(false))
    }
  }, [params.id, fetchProductById])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setShowPopUp(true)
    setTimeout(() => setShowPopUp(false), 3000)
  }

  return (
    <>
      <Header />
      <CategoriesSlider
        onCategoryChange={(category) => {
          setKeyword('')
          setActivatedCategory(category)
          router.push('/pages/products')
        }}
      />
      {loading ? (
        <ProductPageSkeleton />
      ) : product ? (
        <Page>
          <ProductDetails product={product} addToCart={handleAddToCart} />
          <div>
            <LikedProductsText>
              Produtos que você pode gostar também:
            </LikedProductsText>
            <LikedProducts product={product} />
          </div>
          {showPopUp && <PopUp>Produto adicionado ao carrinho!</PopUp>}
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

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: red;
  text-align: center;
  margin-top: 50px;
`

const LikedProductsText = styled.h2`
  font-size: 1.5rem;
  padding: 30px 0px 0px 30px;
  color: black;
`
