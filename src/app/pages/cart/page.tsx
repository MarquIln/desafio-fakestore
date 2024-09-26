/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { AddressForm } from '@/components/address-form'
import { CartItem } from '@/components/cart-item'
import { Header } from '@/components/header'
import { Modal } from '@/components/modal'
import { useCartStore } from '@/context/cart-store'
import type { Address } from '@/types/address'
import { useFormatTitle } from '@/hooks/use-format-title'

export default function CartPage() {
  const { items, removeFromCart, loadCartFromLocalStorage } = useCartStore(
    (state) => ({
      items: state.cart,
      removeFromCart: state.removeFromCart,
      loadCartFromLocalStorage: state.loadCartFromLocalStorage,
    }),
  )

  const [showModal, setShowModal] = useState(false)

  const formMethods = useForm<Address>({
    defaultValues: {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      number: '',
      complement: '',
    },
  })
  const { watch } = formMethods

  const zipCode = watch('zipCode')
  const number = watch('number')

  const isFormValid = useMemo(() => {
    return zipCode?.replace(/\D/g, '').length === 8 && number?.trim() !== ''
  }, [zipCode, number])

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + (item.quantity || 0), 0),
    [items],
  )

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          (item.discountedPrice ?? item.price ?? 0) * (item.quantity || 0),
        0,
      ),
    [items],
  )

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  const handleFinalizePurchase = () => {
    setShowModal(true)
  }

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  return (
    <>
      <Header />
      <PageWrapper>
        <h1>Carrinho</h1>
        {items.length > 0 ? (
          <ContentWrapper>
            <CartItemsWrapper>
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
                  <strong>Preço total:</strong>{' '}
                  {totalPrice.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </SummaryItem>
              </Summary>
            </CartItemsWrapper>
            <FormWrapper>
              <FormProvider {...formMethods}>
                <form
                  onSubmit={formMethods.handleSubmit(handleFinalizePurchase)}
                >
                  <AddressForm />
                  <FinalizeButton type="submit" disabled={!isFormValid}>
                    Finalizar Compra
                  </FinalizeButton>
                </form>
              </FormProvider>
            </FormWrapper>
          </ContentWrapper>
        ) : (
          <EmptyCartMessage>Seu carrinho está vazio ainda.</EmptyCartMessage>
        )}
      </PageWrapper>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Você finalizou sua compra com sucesso!"
      >
        <div>
          <h2>Resumo da Compra</h2>
          <ul>
            {items.map((product) => (
              <li key={product.id}>
                {useFormatTitle(product.brand, product.model)} -{' '}
                {product.quantity}x -{' '}
                {(
                  (product.discountedPrice ?? product.price) * product.quantity
                ).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </li>
            ))}
          </ul>
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
  padding: 2rem;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const CartItemsWrapper = styled.div`
  flex: 1;
`

const FormWrapper = styled.div`
  flex: 0 0 300px;
  margin-top: 2rem;
`

const Summary = styled.div`
  margin-top: 2rem;
`

const SummaryItem = styled.p`
  font-size: 1.25rem;
`

const FinalizeButton = styled.button<{ disabled: boolean }>`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#fd3a3a')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#c9302c')};
  }
`

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #555;
`
