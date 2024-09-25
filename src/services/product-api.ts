import axios from 'axios'

export const fetchProductsByPage = async (page: number) => {
  const response = await axios
    .get(`https://fakestoreapi.in/api/products?page=${page}&limit=30`)
    .then((res) => res.data.products)
  return response
}

export const fetchProductById = async (id: number) => {
  const response = await axios.get(`https://fakestoreapi.in/api/products/${id}`)
  return response
}

export const fetchAllProducts = async () => {
  const response = await axios
    .get(`https://fakestoreapi.in/api/products?limit=1500`)
    .then((res) => res.data.products)
  return response
}

export const fetchAllCategories = async () => {
  const response = await axios
    .get(`https://fakestoreapi.in/api/products/category`)
    .then((res) => res.data.categories)
  return response
}

export const fetchProductByCategory = async (category: string) => {
  const response = await axios
    .get(`https://fakestoreapi.in/api/products/category?type=${category}`)
    .then((res) => res.data.products)
  return response
}
