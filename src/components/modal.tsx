import { useCartStore } from '@/context/cart-store'
import type { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { removeAllProductsFromCart } = useCartStore()
  if (!isOpen) return null

  const handleFinishPurchase = () => {
    removeAllProductsFromCart()
    onClose()
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>{children}</ModalBody>
        <ButtonContainer>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
          <ConfirmPurchaseButton onClick={handleFinishPurchase}>
            Confirmar compra
          </ConfirmPurchaseButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`

const ModalContent = styled.div`
  background: #ffffff;
  color: #333333;
  padding: 40px;
  border-radius: 10px;
  max-width: 550px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
`

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 25px;
  font-weight: bold;
`

const ModalBody = styled.div`
  font-size: 1.2rem;
  margin-bottom: 35px;
  line-height: 1.6;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`

const CloseButton = styled.button`
  padding: 12px 24px;
  background-color: #d9534f;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }
`

const ConfirmPurchaseButton = styled.button`
  padding: 12px 24px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`
