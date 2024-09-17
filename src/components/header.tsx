'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BsCart } from 'react-icons/bs'
import styled from 'styled-components'
import { SearchBar } from './search-bar'
import { Filter } from './filter'
import { useCartStore } from '@/context/cart-store'
import { Sidebar } from './sidebar'

interface HeaderProps {
  onKeywordChange?: (keyword: string) => void
  onCategoryChange?: (category: string) => void
  disableFilters?: boolean
}

export const Header = ({
  onKeywordChange,
  onCategoryChange,
  disableFilters = false,
}: HeaderProps) => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const { cart } = useCartStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword)
    if (onKeywordChange) {
      onKeywordChange(keyword)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <StyledHeader>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onCategoryChange={onCategoryChange}
          disableFilters={disableFilters}
        />
        <Logo onClick={() => router.push('/')}>Store</Logo>
        <FiltersDesktop>
          <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
          {!disableFilters && (
            <Filter
              onCategoryChange={(category) => {
                if (onCategoryChange) onCategoryChange(category)
              }}
            />
          )}
        </FiltersDesktop>
        <Cart onClick={() => router.push('/cart')}>
          <BsCart />
          {cart.length > 0 && <CartQuantity>{cart.length}</CartQuantity>}
        </Cart>
      </StyledHeader>
    </>
  )
}

const StyledHeader = styled.header`
  padding: 10px 20px;
  background-color: white;
  color: black;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const Logo = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`

const Cart = styled.div`
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #fd3a3a;
`

const CartQuantity = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #fd3a3a;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`

const FiltersDesktop = styled.div`
  display: none;
  gap: 20px;
  align-items: center;

  @media (min-width: 769px) {
    display: flex;
  }
`
