import { useProductStore } from '@/context/product-store'
import { fetchAllCategories } from '@/services/product-api'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface CategoriesSliderProps {
  onCategoryChange: (category: string) => void
}

export const CategoriesSlider = ({
  onCategoryChange,
}: CategoriesSliderProps) => {
  const [categories, setCategories] = useState<string[]>([])
  const { activatedCategory, setActivatedCategory, setKeyword } =
    useProductStore((state) => state)

  const getAllCategories = async () => {
    const categories = await fetchAllCategories()
    setCategories(categories)
  }

  const handleCategorySelect = (category: string) => {
    if (activatedCategory === category) {
      setActivatedCategory(null)
      onCategoryChange('')
      return
    }

    setActivatedCategory(category)
    onCategoryChange(category)
    setKeyword('')
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <SliderContainer>
      <Slider>
        {categories.map((category) => (
          <Category
            key={category}
            isActive={activatedCategory === category}
            onClick={() => handleCategorySelect(category)}
            aria-label={`Select category ${category}`}
          >
            {category}
          </Category>
        ))}
      </Slider>
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  padding: 1rem;
`

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
`

interface CategoryProps {
  isActive: boolean
}

const Category = styled.button<CategoryProps>`
  flex-grow: 1;
  padding: 0.5rem;
  background: ${({ isActive, theme }) =>
    isActive ? '#fd3a3a' : theme.inactiveBackground};
  color: ${({ isActive, theme }) =>
    isActive ? '#fff' : theme.inactiveTextColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  text-transform: capitalize;

  &:hover {
    background: ${({ isActive, theme }) =>
      isActive ? theme.activeHoverBackground : theme.inactiveHoverBackground};
  }
`
