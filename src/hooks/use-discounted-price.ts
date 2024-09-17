import { useMemo } from 'react'

export const useDiscountedPrice = (price: number, discount: number) => {
  return useMemo(() => {
    if (discount > 0) {
      return price - price * (discount / 100)
    }
    return price
  }, [price, discount])
}
