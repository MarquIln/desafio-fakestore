import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface SearchBarProps {
  keyword: string
  onKeywordChange: (keyword: string) => void
}

export const SearchBar = ({ keyword, onKeywordChange }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value)
  }

  const handleClear = () => {
    onKeywordChange('')
  }

  return (
    <StyledSearchBar>
      <FaSearch style={{ marginRight: '10px', color: '#fd3a3a' }} />
      <input
        type="text"
        placeholder="Search for products"
        value={keyword}
        onChange={handleChange}
      />
      {keyword && (
        <FaTimes
          onClick={handleClear}
          style={{ cursor: 'pointer', color: '#fd3a3a' }}
        />
      )}
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
  position: relative;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    color: black;
    padding-left: 40px;
    padding-right: 30px;
    font-size: 16px;
  }

  @media (max-width: 769px) {
    width: 100%;
  }

  input::placeholder {
    color: gray;
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  svg:first-of-type {
    left: 10px;
  }

  svg:last-of-type {
    right: 10px;
  }
`
