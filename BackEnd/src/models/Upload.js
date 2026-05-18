/**
 * Archivo: BackEnd/src\models\Upload.js
 * Proposito: Define la logica principal de Upload dentro de TechHub.
 */
import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Upload = sequelize.define(
  'uploads',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalName: {
      type: DataTypes.STRING(260),
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(260),
      allowNull: false,
      unique: true,
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(260),
      allowNull: false,
    },
  },
  {
    tableName: 'uploads',
  },
)

