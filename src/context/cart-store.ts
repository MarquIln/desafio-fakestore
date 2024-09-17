import type { Product } from '@/types/product'
import { create } from 'zustand'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  loadCartFromLocalStorage: () => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product: Product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id)
      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart, { ...product, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    })
  },

  removeFromCart: (id: number) => {
    set((state) => {
      const updatedCart = state.cart.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 })
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [] as CartItem[])
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    })
  },

  loadCartFromLocalStorage: () => {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      set({ cart: JSON.parse(cartData) })
    }
  },
}))
