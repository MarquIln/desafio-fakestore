import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

export const SearchBar = () => {
  return (
    <StyledSearchBar>
      <FaSearch style={{ marginRight: '10px', color: 'black' }} />
      <input type="text" placeholder="Search products" />
    </StyledSearchBar>
  )
}

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 10px 20px;
  width: 500px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    color: black;
    padding-left: 10px;
    font-size: 16px;
  }

  input::placeholder {
    color: #e0e0e0;
  }
`
