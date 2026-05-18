import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { Upload } from '../models/Upload.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDirectory = path.resolve(__dirname, '../public/uploads')

export async function listUploads(_req, res, next) {
  try {
    const uploads = await Upload.findAll({ order: [['createdAt', 'DESC']] })
    res.json(uploads)
  } catch (error) {
    next(error)
  }
}

export async function updateUpload(req, res, next) {
  try {
    const uploadId = Number(req.params.id)
    if (!Number.isInteger(uploadId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const upload = await Upload.findByPk(uploadId)
    if (!upload) {
      return res.status(404).json({ message: 'Archivo no encontrado.' })
    }

    const nextOriginalName = String(req.body?.originalName || '').trim()
    if (!nextOriginalName) {
      return res.status(400).json({ message: 'originalName es obligatorio para actualizar.' })
    }

    await upload.update({ originalName: nextOriginalName })
    return res.json(upload)
  } catch (error) {
    next(error)
  }
}

export async function uploadFile(req, res, next) {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ message: 'No se envio ningun archivo.' })
    }

    // Guardamos metadata del archivo en la base de datos (uploads table)
    const record = await Upload.create({
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
    })

    return res.status(201).json(record)
  } catch (error) {
    console.error('Error en uploadFile:', error)
    return res.status(500).json({ message: error.message || 'Error interno al subir el archivo.' })
  }
}

export async function deleteUpload(req, res, next) {
  try {
    const uploadId = Number(req.params.id)
    if (!Number.isInteger(uploadId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const upload = await Upload.findByPk(uploadId)
    if (!upload) {
      return res.status(404).json({ message: 'Archivo no encontrado.' })
    }

    const filePath = path.join(uploadsDirectory, upload.filename)
    await fs.unlink(filePath).catch(() => {})
    await upload.destroy()
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
