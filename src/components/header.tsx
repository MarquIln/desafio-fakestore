import styled from 'styled-components'
import { SearchBar } from './search-bar'

export const Header = () => {
  // const [isSearchActive, setIsSearchActive] = useState(false)

  // const handleSearchClick = () => {
  //   setIsSearchActive(!isSearchActive)
  // }

  return (
    <StyledHeader>
      <p>Store</p>
      <SearchBar />
      <p>CART</p>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
