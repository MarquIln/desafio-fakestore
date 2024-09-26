import type { Product } from './product'

interface CartProduct {
  products: Product
  quantity: number
  total: number
}

export interface Cart {
  items: CartProduct[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}
