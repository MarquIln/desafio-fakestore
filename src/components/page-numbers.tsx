import { useMemo } from 'react'
import { PageIndicator, Ellipsis } from '@/components/pagination'

interface PageNumbersProps {
  page: number
  totalPages: number
  keyword: string
  selectedCategory: string | null
  onPageClick: (pageNumber: number) => void
}

export const PageNumbers = ({
  page,
  totalPages,
  keyword,
  selectedCategory,
  onPageClick,
}: PageNumbersProps) => {
  const renderPageNumbers = useMemo(() => {
    if (keyword || selectedCategory) return null

    const pages = []
    pages.push(
      <PageIndicator
        key={1}
        onClick={() => onPageClick(1)}
        isActive={page === 1}
      >
        1
      </PageIndicator>,
    )
    if (page > 3) {
      pages.push(<Ellipsis key="start-ellipsis">...</Ellipsis>)
    }

    const startPage = Math.max(2, page - 1)
    const endPage = Math.min(totalPages - 1, page + 1)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageIndicator
          key={i}
          onClick={() => onPageClick(i)}
          isActive={page === i}
        >
          {i}
        </PageIndicator>,
      )
    }

    if (page < totalPages - 2) {
      pages.push(<Ellipsis key="end-ellipsis">...</Ellipsis>)
    }

    if (totalPages > 1) {
      pages.push(
        <PageIndicator
          key={totalPages}
          onClick={() => onPageClick(totalPages)}
          isActive={page === totalPages}
        >
          {totalPages}
        </PageIndicator>,
      )
    }

    return pages
  }, [page, totalPages, keyword, selectedCategory, onPageClick])

  return <>{renderPageNumbers}</>
}
