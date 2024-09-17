import { fetchProductById, fetchProductsByPage } from '@/services/api'
import { Product } from '@/types/product'
import { create } from 'zustand'

interface ProductStore {
  product: Product | null
  filteredProducts: Product[]
  setProduct: (product: Product) => void
  setFilteredProducts: (products: Product[]) => void
  fetchProductById: (id: number) => Promise<void>
  fetchProducts: () => Promise<void>
  searchProductByKeyword: (keyword: string) => void
  activatedCategory: string | null
  setActivatedCategory: (categories: string | null) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  filteredProducts: [],
  setProduct: (product) => set({ product }),
  setFilteredProducts: (products) => set({ filteredProducts: products }),
  fetchProductById: async (id: number) => {
    try {
      const response = await fetchProductById(id)
      set({ product: response.data.product })
    } catch (error) {
      console.error(error)
      set({ product: null })
    }
  },
  fetchProducts: async () => {
    try {
      const products = await fetchProductsByPage(1)
      set({ filteredProducts: products })
    } catch (error) {
      console.error(error)
    }
  },
  searchProductByKeyword: (keyword: string) => {
    set((state) => {
      const filtered = state.filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase()),
      )
      return { filteredProducts: filtered }
    })
  },
  activatedCategory: null,
  setActivatedCategory: (category) => set({ activatedCategory: category }),
}))
