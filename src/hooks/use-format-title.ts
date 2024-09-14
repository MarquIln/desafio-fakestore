export const useFormatTitle = (brand: string, model: string) => {
  const brandInModel = model.toLowerCase().includes(brand.toLowerCase())
  return brandInModel
    ? `${model}`
    : `${brand[0].toUpperCase() + brand.substring(1)} ${model}`
}
