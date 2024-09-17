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

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 10px;
  color: black;
`

const Summary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  color: black;
  font-size: 1.2rem;

  p {
    margin: 0.8rem 0;
    font-weight: bold;
  }

  p strong {
    font-weight: bold;
  }
`

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #777;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const FinalizeButton = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`
