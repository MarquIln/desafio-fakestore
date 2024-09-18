/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { CartItem } from '@/components/cart-item'
import { Header } from '@/components/header'
import { Modal } from '@/components/modal'
import { useCartStore } from '@/context/cart-store'
import { useFormatTitle } from '@/hooks/use-format-title'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

export default function CartPage() {
  const { items, removeFromCart, loadCartFromLocalStorage } = useCartStore(
    (state) => ({
      items: state.cart,
      removeFromCart: state.removeFromCart,
      loadCartFromLocalStorage: state.loadCartFromLocalStorage,
    }),
  )

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + (item.quantity || 0), 0),
    [items],
  )

  const totalPrice = useMemo(
    () =>
      items.reduce((total, item) => {
        const price = item.discountedPrice ?? item.price ?? 0
        return total + price * (item.quantity || 0)
      }, 0),
    [items],
  )

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  const handleFinalizePurchase = () => {
    setShowModal(true)
  }

  return (
    <>
      <Header />
      <PageWrapper>
        <h1>Carrinho</h1>
        {items.length > 0 ? (
          <>
            {items.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={product.quantity || 0}
                onRemove={handleRemoveFromCart}
              />
            ))}
            <Summary>
              <SummaryItem>
                <strong>Total de produtos:</strong> {totalItems}
              </SummaryItem>
              <SummaryItem>
                <strong>Preço total: </strong>
                {totalPrice.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </SummaryItem>
              <FinalizeButton onClick={handleFinalizePurchase}>
                Finalizar Compra
              </FinalizeButton>
            </Summary>
          </>
        ) : (
          <EmptyCartMessage>Seu carrinho está vazio ainda.</EmptyCartMessage>
        )}
      </PageWrapper>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirmação de Compra"
      >
        <div>
          <ul>
            {items.map((product) => {
              const displayPrice = product.discountedPrice ?? product.price ?? 0

              return (
                <li key={product.id}>
                  {useFormatTitle(
                    product.brand || 'Marca desconhecida',
                    product.model || 'Modelo desconhecido',
                  )}{' '}
                  - <strong>{product.quantity || 0}</strong> unidade(s) -{' '}
                  {displayPrice.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'USD',
                  })}{' '}
                  cada
                </li>
              )
            })}
          </ul>
          <p>
            <strong>Total de produtos:</strong> {totalItems}
          </p>
          <p>
            <strong>Preço total: </strong>
            {totalPrice.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
      </Modal>
    </>
  )
}

const PageWrapper = styled.div<{ theme: 'dark' | 'light' }>`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`

const Summary = styled.div<{ theme: 'dark' | 'light' }>`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#f9f9f9')};
  border-radius: 8px;
`

const SummaryItem = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
`

const FinalizeButton = styled.button<{ theme: 'dark' | 'light' }>`
  background-color: ${({ theme }) =>
    theme === 'dark' ? '#28a745' : '#28a745'};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#fff')};
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) =>
      theme === 'dark' ? '#218838' : '#218838'};
  }
`

const EmptyCartMessage = styled.p<{ theme: 'dark' | 'light' }>`
  text-align: center;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  font-size: 1.2rem;
  font-weight: bold;
`
