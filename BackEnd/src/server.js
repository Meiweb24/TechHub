import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import app from './app.js'
import { verifyDatabaseConnection, sequelize } from './config/db.js'
import './models/Product.js'
import { User } from './models/User.js'
import './models/Upload.js'

dotenv.config()

const port = Number(process.env.PORT ?? 4000)

async function ensureDefaultAdmin() {
  const [admin, created] = await User.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      email: 'admin@gmail.com',
      passwordHash: bcrypt.hashSync('1234', 10),
      role: 'admin',
    },
  })

  if (!created) {
    const needsUpdate =
      admin.email !== 'admin@gmail.com' ||
      admin.role !== 'admin' ||
      !bcrypt.compareSync('1234', admin.passwordHash)

    if (needsUpdate) {
      admin.email = 'admin@gmail.com'
      admin.role = 'admin'
      admin.passwordHash = bcrypt.hashSync('1234', 10)
      await admin.save()
      console.log('Usuario administrador existente actualizado a admin@gmail.com / 1234')
    } else {
      console.log('Usuario administrador existente detectado.')
    }
  } else {
    console.log('Usuario administrador creado por defecto: admin / 1234')
  }
}

async function start() {
  try {
    await verifyDatabaseConnection()
    await sequelize.sync()
    await ensureDefaultAdmin()

    app.listen(port, () => {
      console.log(`API Tech Hub activa en http://localhost:${port}`)
    })
  } catch (error) {
    console.error('No fue posible iniciar el backend:', error.message)
    process.exit(1)
  }
}

start()
