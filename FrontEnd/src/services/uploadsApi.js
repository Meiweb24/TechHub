/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\services\uploadsApi.js
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE,
})

function toApiError(error) {
  const message = error?.response?.data?.message ?? error?.message ?? 'Error de comunicacion con el servidor'
  return new Error(message)
}

// listUploads: coordina este flujo principal del modulo.
export async function listUploads() {
  try {
    const { data } = await api.get('/uploads')
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

// uploadFile: coordina este flujo principal del modulo.
export async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

// deleteUpload: coordina este flujo principal del modulo.
export async function deleteUpload(uploadId) {
  try {
    await api.delete(`/uploads/${uploadId}`)
    return null
  } catch (error) {
    throw toApiError(error)
  }
}

