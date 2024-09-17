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
  background-color: #e9e9e9;
  border-radius: 10px;
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

  @media (max-width: 769px) {
    width: 100%;
  }

  input::placeholder {
    color: gray;
  }
`
