import axios from 'axios'
import { ZipCode } from '@/types/zip-code'

export const getZipCodeInfo = async (
  zipCode: string,
): Promise<ZipCode | null> => {
  try {
    const response = await axios.get<ZipCode>(
      `https://brasilapi.com.br/api/cep/v1/${zipCode}`,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}
