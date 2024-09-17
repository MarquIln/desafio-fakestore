'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BsCart } from 'react-icons/bs'
import { FaBars, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { SearchBar } from './search-bar'
import { Filter } from './filter'
import { useCartStore } from '@/context/cart-store'

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
        <MenuButton onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <Logo
          onClick={() => {
            router.push('/')
          }}
        >
          Store
        </Logo>
        <FiltersDesktop>
          <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
          {!disableFilters && (
            <Filter
              onCategoryChange={(category) => {
                if (onCategoryChange) {
                  onCategoryChange(category)
                }
              }}
            />
          )}
        </FiltersDesktop>
        <Cart
          onClick={() => {
            router.push('/cart')
          }}
        >
          <BsCart />
          {cart.length > 0 && <CartQuantity>{cart.length}</CartQuantity>}
        </Cart>
      </StyledHeader>

      <MobileSidebar $isOpen={isSidebarOpen}>
        <SidebarContent>
          <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
          {!disableFilters && (
            <Filter
              onCategoryChange={(category) => {
                if (onCategoryChange) {
                  onCategoryChange(category)
                }
              }}
            />
          )}
        </SidebarContent>
      </MobileSidebar>

      {isSidebarOpen && <Overlay onClick={toggleSidebar} />}
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

const MenuButton = styled.button`
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: black;

  @media (min-width: 769px) {
    display: none;
  }
`

const FiltersDesktop = styled.div`
  display: none;
  gap: 20px;
  align-items: center;

  @media (min-width: 769px) {
    display: flex;
  }
`

const MobileSidebar = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  height: 100%;
  width: 100%;
  max-width: 250px;
  background-color: white;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;

  @media (min-width: 769px) {
    display: none;
  }
`

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
  box-sizing: border-box;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`
