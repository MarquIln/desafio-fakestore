import { useProductStore } from '@/context/product-store'
import { fetchAllCategories } from '@/services/api'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface CategoriesSliderProps {
  onCategoryChange: (category: string) => void
}
export const CategoriesSlider = ({
  onCategoryChange,
}: CategoriesSliderProps) => {
  const [categories, setCategories] = useState<string[]>([])
  const { activatedCategory, setActivatedCategory } = useProductStore(
    (state) => state,
  )

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
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <SliderContainer>
      <SliderTitle>Categorias</SliderTitle>
      <Slider>
        {categories.map((category) => (
          <Category
            key={category}
            isActive={activatedCategory === category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </Category>
        ))}
      </Slider>
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  padding: 0rem 1rem 0rem 1rem;
`

const SliderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
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
  padding: 0.5rem 0rem;
  background: ${({ isActive }) => (isActive ? '#fd3a3a' : '#e9e9e9')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  text-transform: capitalize;

  &:hover {
    background: ${({ isActive }) => (isActive ? '#dd3333' : '#e9e9e9')};
  }
`
