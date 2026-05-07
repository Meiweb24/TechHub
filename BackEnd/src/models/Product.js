import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Product = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categoryLabel: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    adminOnly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    tagline: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dealTag: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'products',
  },
)
