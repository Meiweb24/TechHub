import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

function toApiError(error) {
  const message = error?.response?.data?.message ?? error?.message ?? 'Error de comunicacion con el servidor'
  return new Error(message)
}

export async function fetchProducts() {
  try {
    const { data } = await api.get('/products')
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function createProduct(payload) {
  try {
    const { data } = await api.post('/products', payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function updateProduct(productId, payload) {
  try {
    const { data } = await api.put(`/products/${productId}`, payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function deleteProduct(productId) {
  try {
    await api.delete(`/products/${productId}`)
    return null
  } catch (error) {
    throw toApiError(error)
  }
}
