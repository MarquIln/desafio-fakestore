import axios from 'axios'

export const fetchProductsByPage = async (page: number) => {
  const response = await axios
    .get(`https://fakestoreapi.in/api/products?page=${page}&limit=20`)
    .then((res) => res.data.products)
  return response
}

export const fetchProductById = async (id: number) => {
  const response = await axios
    .get(`https://fakestoreapi.in/api/products/${id}`)
    .then((res) => res.data)
  return response
}
