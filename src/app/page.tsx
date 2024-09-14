'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => router.push('/products')}>Products</button>
    </div>
  )
}
