import { useProductStore } from '@/context/product-store'
import { fetchAllCategories } from '@/services/api'
import { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import styled from 'styled-components'

interface FilterProps {
  onCategoryChange: (category: string) => void
  isSidebar?: boolean
}

export const Filter = ({ onCategoryChange, isSidebar }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const { activatedCategory, setActivatedCategory } = useProductStore(
    (state) => state,
  )

  const getAllCategories = async () => {
    const categories = await fetchAllCategories()
    setCategories(categories)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  const handleCategorySelect = (category: string) => {
    setActivatedCategory(category)
    onCategoryChange(category)
    setIsOpen(false)
  }

  const handleResetFilter = () => {
    setActivatedCategory(null)
    onCategoryChange('')
    setIsOpen(false)
  }

  return (
    <FilterContainer>
      <DropdownButton
        active={!!activatedCategory}
        onClick={() => setIsOpen(!isOpen)}
        isSidebar={isSidebar}
        aria-expanded={isOpen}
        aria-label="Filter categories"
      >
        {isSidebar && <span>Filtros</span>}
        <FaFilter style={{ marginLeft: isSidebar ? '8px' : '0' }} />
      </DropdownButton>

      <DropdownContent open={isOpen}>
        {categories.map((category) => (
          <DropdownItem
            key={category}
            onClick={() => handleCategorySelect(category)}
            aria-label={`Select category ${category}`}
          >
            {category}
          </DropdownItem>
        ))}
        <DropdownReset onClick={handleResetFilter} aria-label="Remove filter">
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

const DropdownButton = styled.button<{ active: boolean; isSidebar?: boolean }>`
  background-color: ${(props) => (props.active ? '#fd3a3a' : 'white')};
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;

  @media (min-width: 600px) {
    ${(props) =>
      !props.isSidebar &&
      `
      span {
        display: none;
      }
    `}
  }
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
