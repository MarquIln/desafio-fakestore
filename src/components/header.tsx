import styled from 'styled-components'
import { SearchBar } from './search-bar'
import { useRouter } from 'next/navigation'
import { BsCart } from 'react-icons/bs'

export const Header = () => {
  const router = useRouter()
  // const [isSearchActive, setIsSearchActive] = useState(false)

  // const handleSearchClick = () => {
  //   setIsSearchActive(!isSearchActive)
  // }

  return (
    <StyledHeader>
      <Logo
        onClick={() => {
          router.push('/products')
        }}
      >
        Store
      </Logo>
      <SearchBar />
      <Cart
        onClick={() => {
          router.push('/cart')
        }}
      >
        <BsCart />
      </Cart>
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

const Logo = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`

const Cart = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`
