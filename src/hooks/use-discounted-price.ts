import { useMemo } from 'react'

export const useDiscountedPrice = (price: number, discount: number | null) => {
  return useMemo(() => {
    if (discount !== null) {
      return price - price * (discount / 100)
    }
    return price
  }, [price, discount])
}
