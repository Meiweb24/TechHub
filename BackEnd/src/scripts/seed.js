import dotenv from 'dotenv'
import { sequelize } from '../config/db.js'
import { Product } from '../models/Product.js'
import { products } from '../data/seedData.js'

dotenv.config()

async function run() {
  try {
    await sequelize.authenticate()
    await Product.sync()

    await Product.destroy({ where: {}, truncate: true })

    await Product.bulkCreate(products)

    console.log(`Seed completado con ${products.length} productos.`)
    process.exit(0)
  } catch (error) {
    console.error('Error al ejecutar seed:', error.message)
    process.exit(1)
  }
}

run()
