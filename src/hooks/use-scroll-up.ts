import { useEffect, useState } from 'react'

export const useScrollToTop = (isActive: boolean) => {
  const [scrolling, setScrolling] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  )

  useEffect(() => {
    if (isActive && scrolling) {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      const timeout = setTimeout(() => {
        setScrolling(false)
      }, 1000)
      setScrollTimeout(timeout)
    }
  }, [isActive, scrolling, scrollTimeout])

  const handleScroll = () => {
    setScrolling(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { handleScroll }
}
