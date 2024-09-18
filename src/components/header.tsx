import { useCartStore } from '@/context/cart-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import styled from 'styled-components'
import { Filter } from './filter'
import { SearchBar } from './search-bar'
import { Sidebar } from './sidebar'
import { useProductStore } from '@/context/product-store'

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
  const { keyword, setKeyword } = useProductStore()
  const { cart } = useCartStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

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
        <Logo
          onClick={() => {
            setKeyword('')
            router.push('/')
          }}
        >
          FakeStore
        </Logo>
        <ContentWrapper>
          <FiltersDesktop>
            <SearchBar
              keyword={keyword}
              onKeywordChange={handleKeywordChange}
            />
            {!disableFilters && (
              <Filter
                onCategoryChange={(category) => {
                  if (onCategoryChange) onCategoryChange(category)
                }}
              />
            )}
          </FiltersDesktop>
        </ContentWrapper>
        <RightSection>
          <Cart onClick={() => router.push('/cart')}>
            <FaCartShopping color="#fd3a3a" size={30} />
            {totalQuantity > 0 && <CartQuantity>{totalQuantity}</CartQuantity>}
          </Cart>
        </RightSection>
      </StyledHeader>
    </>
  )
}

const StyledHeader = styled.header`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
`

const Logo = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #fd3a3a;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
    flex: 1;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex: none;
  }
`

const Cart = styled.div`
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.primaryButtonBgColor};
  align-items: center;
`

const CartQuantity = styled.span`
  position: absolute;
  bottom: 0px;
  right: 10px;
  background-color: #fd3a3a;
  color: #ffffff;
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

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
