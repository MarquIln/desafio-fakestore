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
  color: white;
  width: 45px;
  height: 45px;
  font-size: 16px;
  cursor: pointer;
  align-content: center;
  border: 1px solid #fd3a3a;
  border-radius: 10px;
`
