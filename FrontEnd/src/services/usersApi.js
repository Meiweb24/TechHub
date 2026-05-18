/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\services\usersApi.js
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
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

export async function listUsers() {
  try {
    const { data } = await api.get('/users')
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function createUser(payload) {
  try {
    const { data } = await api.post('/users', payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function updateUser(userId, payload) {
  try {
    const { data } = await api.put(`/users/${userId}`, payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function deleteUser(userId) {
  try {
    await api.delete(`/users/${userId}`)
    return null
  } catch (error) {
    throw toApiError(error)
  }
}

