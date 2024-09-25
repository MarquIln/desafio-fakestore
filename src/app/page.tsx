'use client'

import { useCartStore } from '@/context/cart-store'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/spinner'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

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

  router.push('/pages/products')
}
