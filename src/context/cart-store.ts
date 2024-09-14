import type { Product } from '@/types/product'
import { create } from 'zustand'

interface CartState {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateCart: (cart: Product[]) => void
  loadCartFromLocalStorage: () => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product: Product) => {
    set((state) => {
      const updatedCart = [...state.cart, product]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    })
  },

  removeFromCart: (id: number) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    })
  },

  updateCart: (cart: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(cart))
    set({ cart })
  },

  loadCartFromLocalStorage: () => {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      set({ cart: JSON.parse(cartData) })
    }
  },
}))
