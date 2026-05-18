import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import { sequelize } from '../config/db.js'
import '../models/Product.js'
import '../models/User.js'
import '../models/Upload.js'

dotenv.config()

async function run() {
  const host = process.env.DB_HOST ?? 'localhost'
  const port = Number(process.env.DB_PORT ?? 3306)
  const user = process.env.DB_USER ?? 'root'
  const password = process.env.DB_PASSWORD ?? ''
  const database = process.env.DB_NAME ?? 'techhub_db'

  let connection
  const mysqlAppUser = 'un_usr'
  const mysqlAppPassword = 'una_clave'

  try {
    connection = await mysql.createConnection({ host, port, user, password })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)

    if (user !== mysqlAppUser) {
      await connection.query(`CREATE USER IF NOT EXISTS '${mysqlAppUser}'@'%' IDENTIFIED BY ?`, [mysqlAppPassword])
      await connection.query(`GRANT ALL PRIVILEGES ON \`${database}\`.* TO '${mysqlAppUser}'@'%'`)
      await connection.query('FLUSH PRIVILEGES')
      console.log(`Usuario MySQL '${mysqlAppUser}' creado o verificado.`)
    }

    await connection.end()

    await sequelize.authenticate()
    await sequelize.sync()

    console.log(`Base de datos \"${database}\" lista y tablas sincronizadas.`)
    process.exit(0)
  } catch (error) {
    if (connection) {
      await connection.end().catch(() => {})
    }
    console.error('Error inicializando base de datos:', error.message)
    process.exit(1)
  }
}

run()
