'use client'

import { useCartStore } from '@/context/cart-store'
import { useEffect, useState } from 'react'
import AllProductsPage from './products/page'
import { Spinner } from '@/components/spinner'

export default function Home() {
  const loadCartFromLocalStorage = useCartStore(
    (state) => state.loadCartFromLocalStorage,
  )
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    loadCartFromLocalStorage()

    setTimeout(() => {
      setIsPageLoading(false)
    }, 1000)
  }, [loadCartFromLocalStorage])

  if (isPageLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner />
      </div>
    )
  }

  return <AllProductsPage />
}
