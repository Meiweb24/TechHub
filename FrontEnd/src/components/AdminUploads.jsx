/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\AdminUploads.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useEffect, useState } from 'react'
import { deleteUpload, listUploads, uploadFile } from '../services/uploadsApi'

const API_ROOT = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api').replace(/\/api\/?$/i, '')

export default function AdminUploads() {
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadUploads()
  }, [])

  const loadUploads = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listUploads()
      setUploads(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] ?? null)
    setMessage('')
    setError('')
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    if (!selectedFile) {
      setError('Selecciona un archivo para subir.')
      return
    }

    try {
      await uploadFile(selectedFile)
      setSelectedFile(null)
      setMessage('Archivo subido correctamente.')
      loadUploads()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (uploadId) => {
    const confirmed = window.confirm('Eliminar el archivo subido?')
    if (!confirmed) return
    try {
      await deleteUpload(uploadId)
      setMessage('Archivo eliminado.')
      loadUploads()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="admin-section">
      <h2>Subida de archivos</h2>
      {message ? <p className="admin-ok">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      <form className="admin-create" onSubmit={handleUpload}>
        <div className="admin-create__grid">
          <input type="file" onChange={handleFileChange} />
          <button className="btn-small btn-save" type="submit">
            Subir archivo
          </button>
        </div>
      </form>

      {loading ? (
        <p className="admin-hint">Cargando archivos...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Tipo</th>
                <th>Tamaño</th>
                <th>Enlace</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => (
                <tr key={upload.id}>
                  <td>{upload.originalName}</td>
                  <td>{upload.mimeType}</td>
                  <td>{upload.size.toLocaleString()} bytes</td>
                  <td>
                    <a
                      href={upload.url.startsWith('http') ? upload.url : `${API_ROOT}${upload.url}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </a>
                  </td>
                  <td>
                    <button className="btn-small btn-danger" type="button" onClick={() => handleDelete(upload.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

