import dotenv from 'dotenv'
import app from './app.js'
import { verifyDatabaseConnection, sequelize } from './config/db.js'
import './models/Product.js'

dotenv.config()

const port = Number(process.env.PORT ?? 4000)

async function start() {
  try {
    await verifyDatabaseConnection()
    await sequelize.sync()

    app.listen(port, () => {
      console.log(`API Tech Hub activa en http://localhost:${port}`)
    })
  } catch (error) {
    console.error('No fue posible iniciar el backend:', error.message)
    process.exit(1)
  }
}

start()
