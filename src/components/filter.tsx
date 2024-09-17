import { fetchAllCategories } from '@/services/api'
import { useEffect, useState } from 'react'
import { FaAngleDoubleDown } from 'react-icons/fa'
import styled from 'styled-components'

interface FilterProps {
  onCategoryChange: (category: string) => void
}

export const Filter = ({ onCategoryChange }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const getAllCategories = async () => {
    const categories = await fetchAllCategories()
    setCategories(categories)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
    setIsOpen(false)
  }

  const handleResetFilter = () => {
    setActiveCategory(null)
    onCategoryChange('')
    setIsOpen(false)
  }

  return (
    <FilterContainer>
      <DropdownButton
        active={!!activeCategory}
        onClick={() => setIsOpen(!isOpen)}
      >
        Filtros
        <FaAngleDoubleDown style={{ marginLeft: '8px' }} />
      </DropdownButton>

      <DropdownContent open={isOpen}>
        {categories.map((category) => (
          <DropdownItem
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </DropdownItem>
        ))}
        <DropdownReset onClick={handleResetFilter}>
          Remover filtro
        </DropdownReset>
      </DropdownContent>
    </FilterContainer>
  )
}

const FilterContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#fd3a3a' : 'white')};
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;
`

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 10px;
`

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 4px;
  color: black;
  text-transform: capitalize;

  &:hover {
    background-color: #c3c3c3;
  }
`

const DropdownReset = styled.div`
  padding: 10px;
  cursor: pointer;
  color: #fd3a3a;
  border: 1px solid white;
  border-radius: 4px;
  &:hover {
    background-color: #fa9797;
  }
`
