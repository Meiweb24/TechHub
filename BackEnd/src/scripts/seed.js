import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { sequelize } from '../config/db.js'
import { Product } from '../models/Product.js'
import { User } from '../models/User.js'
import { Upload } from '../models/Upload.js'
import { products } from '../data/seedData.js'

dotenv.config()

async function run() {
  try {
    await sequelize.authenticate()
    await User.sync()
    await Product.sync()
    await Upload.sync()

    await Promise.all([
      User.destroy({ where: {}, truncate: true }),
      Product.destroy({ where: {}, truncate: true }),
      Upload.destroy({ where: {}, truncate: true }),
    ])

    await Product.bulkCreate(products)

    const users = [
      {
        username: 'un_usr',
        email: 'un_usr@techhub.local',
        passwordHash: bcrypt.hashSync('una_clave', 10),
        role: 'user',
      },
      {
        username: 'admin',
        email: 'admin@gmail.com',
        passwordHash: bcrypt.hashSync('1234', 10),
        role: 'admin',
      },
    ]

    // Usuario administrado fijo para el panel privado.
    // Credenciales: admin / 1234
    // Usuarios registrados normales reciben role 'user'.
    await User.bulkCreate(users)

    console.log(`Seed completado con ${products.length} productos y ${users.length} usuarios.`)
    process.exit(0)
  } catch (error) {
    console.error('Error al ejecutar seed:', error.message)
    process.exit(1)
  }
}

run()
