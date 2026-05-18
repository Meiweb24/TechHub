/**
 * Archivo: BackEnd/src\config\db.js
 * Proposito: Define la logica principal de db dentro de TechHub.
 */
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'techhub_db',
  process.env.DB_USER ?? 'root',
  process.env.DB_PASSWORD ?? '',
  {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
)

// verifyDatabaseConnection: coordina este flujo principal del modulo.
export async function verifyDatabaseConnection() {
  await sequelize.authenticate()
}

