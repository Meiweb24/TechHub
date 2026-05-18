/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\services\productsApi.js
 * Proposito: Centraliza las llamadas HTTP del CRUD de productos.
 * Mantiene una sola instancia de axios y un formato de error consistente.
 */
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

// Cliente HTTP compartido para no repetir configuracion por request.
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Convierte errores de axios a Error estandar para simplificar el manejo en UI/context.
function toApiError(error) {
  const message = error?.response?.data?.message ?? error?.message ?? 'Error de comunicacion con el servidor'
  return new Error(message)
}

// Obtiene el inventario desde /products.
export async function fetchProducts() {
  try {
    const { data } = await api.get('/products')
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

// Crea un producto nuevo y retorna la fila persistida por el backend.
export async function createProduct(payload) {
  try {
    const { data } = await api.post('/products', payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

// Actualiza parcialmente un producto por id.
export async function updateProduct(productId, payload) {
  try {
    const { data } = await api.put(`/products/${productId}`, payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

// Elimina un producto por id.
export async function deleteProduct(productId) {
  try {
    await api.delete(`/products/${productId}`)
    return null
  } catch (error) {
    throw toApiError(error)
  }
}

