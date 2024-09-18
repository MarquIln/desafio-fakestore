import type { ReactNode } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  content: string | ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

export const Button = ({
  content,
  onClick,
  disabled = false,
  type = 'button',
  style,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
    >
      {content}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: #fd3a3a;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e02a2a;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
  }
`
