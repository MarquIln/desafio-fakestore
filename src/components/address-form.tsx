import { useEffect } from 'react'
import { useWatch, useFormContext } from 'react-hook-form'
import { getZipCodeInfo } from '@/services/cep-api'
import styled from 'styled-components'
import { ZipCodeInput } from '@/components/zip-code-input'
import type { Address } from '@/types/address'

export function AddressForm() {
  const { control, setValue, register, formState } = useFormContext<Address>()
  const { errors } = formState
  const zipCode = useWatch({ control, name: 'zipCode' })

  useEffect(() => {
    const fetchAddress = async () => {
      if (zipCode && zipCode.replace(/\D/g, '').length === 8) {
        try {
          const addressInfo = await getZipCodeInfo(zipCode)
          if (addressInfo) {
            setValue('street', addressInfo.street || '')
            setValue('neighborhood', addressInfo.neighborhood || '')
            setValue('city', addressInfo.city || '')
            setValue('state', addressInfo.state || '')
          }
        } catch (error) {
          console.error('Failed to fetch address:', error)
        }
      }
    }

    fetchAddress()
  }, [zipCode, setValue])

  const isAddressLoaded = !!(zipCode && zipCode.replace(/\D/g, '').length === 8)

  return (
    <FormContainer>
      <h2 className="title">Dados da entrega</h2>
      <FormWrapper>
        <InputWrapper>
          <label>CEP:</label>
          <StyledZipCodeInput
            zipCode={zipCode}
            onZipCodeChange={(value) => setValue('zipCode', value)}
            onClear={() => setValue('zipCode', '')}
          />
          {errors.zipCode && <ErrorText>{errors.zipCode.message}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <label>Rua:</label>
          <StyledInput
            {...register('street')}
            placeholder="Rua"
            readOnly={isAddressLoaded}
          />
          {errors.street && <ErrorText>{errors.street.message}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <label>Bairro:</label>
          <StyledInput
            {...register('neighborhood')}
            placeholder="Bairro"
            readOnly={isAddressLoaded}
          />
          {errors.neighborhood && (
            <ErrorText>{errors.neighborhood.message}</ErrorText>
          )}
        </InputWrapper>
        <InputWrapper>
          <label>Cidade:</label>
          <StyledInput
            {...register('city')}
            placeholder="Cidade"
            readOnly={isAddressLoaded}
          />
          {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <label>Estado:</label>
          <StyledInput
            {...register('state')}
            placeholder="Estado"
            readOnly={isAddressLoaded}
          />
          {errors.state && <ErrorText>{errors.state.message}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <label>Número:</label>
          <StyledInput
            {...register('number')}
            placeholder="Digite seu número"
          />
          {errors.number && <ErrorText>{errors.number.message}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <label>Complemento:</label>
          <StyledInput
            {...register('complement')}
            placeholder="Digite o complemento"
          />
        </InputWrapper>
      </FormWrapper>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  width: 100%;
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }
`

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: bold;
  }
`

const StyledInput = styled.input`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  background-color: #e9e9e9;

  &:read-only {
    background-color: #f5f5f5;
    color: #999;
  }
`

const StyledZipCodeInput = styled(ZipCodeInput)`
  width: 100%;

  input {
    width: 100%;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    background-color: #e9e9e9;
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
`
