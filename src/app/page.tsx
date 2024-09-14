'use client'

import { useCartStore } from '@/context/cart-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  const loadCartFromLocalStorage = useCartStore(
    (state) => state.loadCartFromLocalStorage,
  )

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => router.push('/products')}>Products</button>
    </div>
  )
}
