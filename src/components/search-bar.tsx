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
    <SearchBarContainer>
      <FaSearch color="#fd3a3a" />
      <SearchInput
        type="text"
        placeholder="Search for products"
        value={keyword}
        onChange={handleChange}
      />
      {keyword && <ClearIcon color="#fd3a3a" onClick={handleClear} />}
    </SearchBarContainer>
  )
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 10px;
  padding: 10px 20px;
  width: 500px;
  position: relative;

  @media (max-width: 769px) {
    width: 100%;
  }
`

const ClearIcon = styled(FaTimes)`
  cursor: pointer;
  color: '#fd3a3a';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  color: black;
  padding-left: 10px;
  font-size: 16px;

  ::placeholder {
    color: gray;
  }
`
