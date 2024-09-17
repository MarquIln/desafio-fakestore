'use client'

import { CartItem } from '@/components/cart-item'
import { Header } from '@/components/header'
import { useCartStore } from '@/context/cart-store'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'

export default function CartPage() {
  const { items, removeFromCart, loadCartFromLocalStorage } = useCartStore(
    (state) => ({
      items: state.cart,
      removeFromCart: state.removeFromCart,
      loadCartFromLocalStorage: state.loadCartFromLocalStorage,
    }),
  )

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  const totalItems = useMemo(() => items.length, [items])

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price, 0),
    [items],
  )

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  return (
    <>
      <Header />
      <CartWrapper>
        <h1>Carrinho</h1>
        {items.length > 0 ? (
          <>
            {items.map((product) => (
              <CartItemWrapper key={product.id}>
                <CartItem product={product} onRemove={handleRemoveFromCart} />
              </CartItemWrapper>
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
            </Summary>
          </>
        ) : (
          <EmptyCartMessage>Seu carrinho está vazio 😭</EmptyCartMessage>
        )}
      </CartWrapper>
    </>
  )
}

const CartWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: black;
`

const CartItemWrapper = styled.div`
  margin-bottom: 1rem;
`

const Summary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  color: black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
