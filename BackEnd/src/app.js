/**
 * Archivo: BackEnd/src\app.js
 * Proposito: Define la logica principal de app dentro de TechHub.
 */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import productsRoutes from './routes/productsRoutes.js'
import authRoutes from './routes/authRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import uploadsRoutes from './routes/uploadsRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicPath = path.resolve(__dirname, '../public')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.use('/images', express.static(path.join(publicPath, 'images')))
app.use('/uploads', express.static(path.join(publicPath, 'uploads')))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'techhub-backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/uploads', uploadsRoutes)
app.use('/api/products', productsRoutes)

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Error interno del servidor.' })
})

export default app

