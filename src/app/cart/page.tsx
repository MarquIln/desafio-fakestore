'use client'

import { CartItem } from '@/components/cart-item'
import { Header } from '@/components/header'
import { useCartStore } from '@/context/cart-store'
import { useEffect } from 'react'
import styled from 'styled-components'

export default function CartPage() {
  const { items, removeFromCart, loadCartFromLocalStorage } = useCartStore(
    (state) => ({
      items: state.cart,
      removeFromCart: state.removeFromCart,
      updateQuantity: state.updateCart,
      loadCartFromLocalStorage: state.loadCartFromLocalStorage,
    }),
  )

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  return (
    <>
      <Header />
      <CartWrapper>
        <h1>Carrinho</h1>
        {items.length > 0 ? (
          items.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onRemove={handleRemoveFromCart}
            />
          ))
        ) : (
          <EmptyCartMessage>Seu carrinho está vazio 😭</EmptyCartMessage>
        )}
      </CartWrapper>
    </>
  )
}

const CartWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  color: black;
`

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: black;
`
