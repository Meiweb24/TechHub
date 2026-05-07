import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import productsRoutes from './routes/productsRoutes.js'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'techhub-backend' })
})

app.use('/api/products', productsRoutes)

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Error interno del servidor.' })
})

export default app
