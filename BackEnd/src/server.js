/**
 * Archivo: BackEnd/src\server.js
 * Proposito: Define la logica principal de server dentro de TechHub.
 */
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import app from './app.js'
import { verifyDatabaseConnection, sequelize } from './config/db.js'
import { Product } from './models/Product.js'
import { User } from './models/User.js'
import { Upload } from './models/Upload.js'
import { products as seedProducts } from './data/seedData.js'

dotenv.config()

const port = Number(process.env.PORT ?? 4000)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDirectory = path.resolve(__dirname, '../public/uploads')

// ensureBaseUsers: coordina este flujo principal del modulo.
async function ensureBaseUsers() {
  const baseUsers = [
    { username: 'admin', email: 'admin@gmail.com', password: '1234', role: 'admin' },
    { username: 'un_usr', email: 'un_usr@techhub.local', password: 'una_clave', role: 'user' },
  ]

  for (const baseUser of baseUsers) {
    const [user, created] = await User.findOrCreate({
      where: { username: baseUser.username },
      defaults: {
        email: baseUser.email,
        passwordHash: bcrypt.hashSync(baseUser.password, 10),
        role: baseUser.role,
      },
    })

    if (created) {
      console.log(`Usuario base creado: ${baseUser.username}`)
      continue
    }

    const needsUpdate =
      user.email !== baseUser.email ||
      user.role !== baseUser.role ||
      !bcrypt.compareSync(baseUser.password, user.passwordHash)

    if (!needsUpdate) {
      console.log(`Usuario base existente detectado: ${baseUser.username}`)
      continue
    }

    user.email = baseUser.email
    user.role = baseUser.role
    user.passwordHash = bcrypt.hashSync(baseUser.password, 10)
    await user.save()
    console.log(`Usuario base actualizado: ${baseUser.username}`)
  }
}

// ensureBaseProducts: coordina este flujo principal del modulo.
async function ensureBaseProducts() {
  for (const seedProduct of seedProducts) {
    const [product, created] = await Product.findOrCreate({
      where: { name: seedProduct.name },
      defaults: seedProduct,
    })

    if (created) {
      continue
    }

    let changed = false
    for (const [key, value] of Object.entries(seedProduct)) {
      if (product[key] !== value) {
        product[key] = value
        changed = true
      }
    }

    if (changed) {
      await product.save()
    }
  }

  console.log(`Registros base de productos verificados: ${seedProducts.length}`)
}

function getMimeType(filename) {
  const extension = path.extname(filename).toLowerCase()
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg'
  if (extension === '.png') return 'image/png'
  if (extension === '.webp') return 'image/webp'
  if (extension === '.gif') return 'image/gif'
  if (extension === '.svg') return 'image/svg+xml'
  if (extension === '.mp4') return 'video/mp4'
  if (extension === '.mp3') return 'audio/mpeg'
  if (extension === '.pdf') return 'application/pdf'
  return 'application/octet-stream'
}

function getOriginalName(filename) {
  const parts = filename.split('-')
  if (parts.length <= 1) {
    return filename
  }
  return parts.slice(1).join('-')
}

// Asegura que la tabla uploads refleje los archivos existentes en public/uploads.
async function ensureBaseUploads() {
  const entries = await fs.readdir(uploadsDirectory)
  const fileNames = entries.filter((name) => name !== '.gitkeep')

  for (const filename of fileNames) {
    const fullPath = path.join(uploadsDirectory, filename)
    const stats = await fs.stat(fullPath)
    if (!stats.isFile()) {
      continue
    }

    const baseRecord = {
      originalName: getOriginalName(filename),
      filename,
      mimeType: getMimeType(filename),
      size: stats.size,
      url: `/uploads/${filename}`,
    }

    const [upload, created] = await Upload.findOrCreate({
      where: { filename },
      defaults: baseRecord,
    })

    if (created) {
      continue
    }

    let changed = false
    for (const [key, value] of Object.entries(baseRecord)) {
      if (upload[key] !== value) {
        upload[key] = value
        changed = true
      }
    }

    if (changed) {
      await upload.save()
    }
  }

  console.log(`Registros base de uploads verificados: ${fileNames.length}`)
}

// start: coordina este flujo principal del modulo.
async function start() {
  try {
    await verifyDatabaseConnection()
    await sequelize.sync()
    await ensureBaseUsers()
    await ensureBaseProducts()
    await ensureBaseUploads()

    app.listen(port, () => {
      console.log(`API Tech Hub activa en http://localhost:${port}`)
    })
  } catch (error) {
    console.error('No fue posible iniciar el backend:', error.message)
    process.exit(1)
  }
}

start()

