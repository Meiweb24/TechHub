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

export async function verifyDatabaseConnection() {
  await sequelize.authenticate()
}
