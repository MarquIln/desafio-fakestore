import { useCartStore } from '@/context/cart-store'
import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { setCart } = useCartStore()
  if (!isOpen) return null

  const handleFinishPurchase = () => {
    setCart([])
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
`

const ModalContent = styled.div`
  background: #ffffff;
  color: #333333;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: bold;
`

const ModalBody = styled.div`
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.5;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

const CloseButton = styled.button`
  padding: 10px 20px;
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
  padding: 10px 20px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;

  &:hover {
    background-color: #218838;
  }
`
