import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import app from './app.js'
import { verifyDatabaseConnection, sequelize } from './config/db.js'
import { Product } from './models/Product.js'
import { User } from './models/User.js'
import './models/Upload.js'
import { products as seedProducts } from './data/seedData.js'

dotenv.config()

const port = Number(process.env.PORT ?? 4000)

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

async function start() {
  try {
    await verifyDatabaseConnection()
    await sequelize.sync()
    await ensureBaseUsers()
    await ensureBaseProducts()

    app.listen(port, () => {
      console.log(`API Tech Hub activa en http://localhost:${port}`)
    })
  } catch (error) {
    console.error('No fue posible iniciar el backend:', error.message)
    process.exit(1)
  }
}

start()
