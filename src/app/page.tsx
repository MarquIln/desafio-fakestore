'use client'

import { useCartStore } from '@/context/cart-store'
import { useEffect } from 'react'
import AllProductsPage from './products/page'

export default function Home() {
  const loadCartFromLocalStorage = useCartStore(
    (state) => state.loadCartFromLocalStorage,
  )

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  return <AllProductsPage />
}
