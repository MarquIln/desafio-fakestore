import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  keyword: string
  onKeywordChange: (keyword: string) => void
}

export const SearchBar = ({ keyword, onKeywordChange }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value)
  }

  return (
    <StyledSearchBar>
      <FaSearch style={{ marginRight: '10px', color: 'black' }} />
      <input
        type="text"
        placeholder="Search for products"
        value={keyword}
        onChange={handleChange}
      />
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

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
    color: gray;
  }
`
