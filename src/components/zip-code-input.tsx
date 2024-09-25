import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import InputMask from 'react-input-mask'

interface ZipCodeInputProps {
  zipCode: string
  onZipCodeChange: (zipCode: string) => void
  onClear: () => void
}

export const ZipCodeInput = ({
  zipCode,
  onZipCodeChange,
  onClear,
}: ZipCodeInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onZipCodeChange(e.target.value)
  }

  return (
    <ZipCodeInputContainer>
      <InputMask
        mask="99999-999"
        placeholder="Digite seu CEP"
        value={zipCode}
        onChange={handleChange}
        style={{}}
      />
      {zipCode && <ClearIcon onClick={onClear} />}
    </ZipCodeInputContainer>
  )
}

const ZipCodeInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e9e9e9;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  position: relative;

  @media (max-width: 769px) {
    width: 100%;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    color: black;
    padding-left: 10px;
    font-size: 16px;
    border: '1px solid #ccc';

    ::placeholder {
      color: gray;
    }
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
