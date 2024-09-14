import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 800): typeof value {
  const [debounceValue, setDebounceValue] = useState<typeof value>(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debounceValue
}
