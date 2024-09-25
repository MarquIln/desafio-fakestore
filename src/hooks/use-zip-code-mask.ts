export const useZipCodeMask = (value: string) => {
  const zipCode = value.replace(/\D/g, '')
  return zipCode.replace(/(\d{5})(\d{3})?/, '$1-$2')
}
