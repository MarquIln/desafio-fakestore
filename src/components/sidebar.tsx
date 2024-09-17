import { FaBars, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { SearchBar } from './search-bar'
import { Filter } from './filter'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  onKeywordChange: (keyword: string) => void
  keyword: string
  onCategoryChange?: (category: string) => void
  disableFilters?: boolean
}

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  onKeywordChange,
  keyword,
  onCategoryChange,
  disableFilters = false,
}: SidebarProps) => {
  return (
    <>
      <MenuButton onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      <MobileSidebar $isOpen={isOpen}>
        <SidebarContent>
          <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} />
          {!disableFilters && (
            <Filter
              onCategoryChange={(category) => {
                if (onCategoryChange) onCategoryChange(category)
              }}
            />
          )}
        </SidebarContent>
      </MobileSidebar>

      {isOpen && <Overlay onClick={toggleSidebar} />}
    </>
  )
}

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
