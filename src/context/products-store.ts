import { fetchProductById } from '@/services/api'
import { Product } from '@/types/product'
import { create } from 'zustand'

interface ProductStore {
  product: Product | null
  setProduct: (product: Product | null) => void
  fetchProductById: (id: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
  fetchProductById: async (id: number) => {
    try {
      const response = await fetchProductById(id)
      set({ product: response.data.product })
    } catch (error) {
      console.error(error)
      set({ product: null })
    }
  },
}))
