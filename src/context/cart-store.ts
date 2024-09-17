import { create } from 'zustand'
import type { Product } from '@/types/product'

const calculateDiscountedPrice = (price: number, discount: number) => {
  return price - price * (discount / 100)
}

interface CartItem extends Product {
  quantity: number
  discountedPrice: number
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
    let discountedPrice: number
    if (product.discount) {
      discountedPrice = calculateDiscountedPrice(
        product.price,
        product.discount,
      )
    }

    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id)
      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart, { ...product, quantity: 1, discountedPrice }]

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
