import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    tableName: 'users',
  },
)
