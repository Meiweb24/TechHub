/**
 * Archivo: BackEnd/src\controllers\usersController.js
 * Proposito: Define la logica principal de usersController dentro de TechHub.
 */
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'

function validateUserPayload(payload, { partial = false } = {}) {
  const requiredFields = ['username', 'email', 'password']
  if (!partial) {
    const missing = requiredFields.filter((field) => !payload[field])
    if (missing.length > 0) {
      return `Faltan campos obligatorios: ${missing.join(', ')}`
    }
  }

  if (payload.email && !payload.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'El correo no tiene un formato valido.'
  }

  if (payload.password !== undefined && payload.password.length < 4) {
    return 'La contraseña debe tener al menos 4 caracteres.'
  }

  return null
}

// listUsers: coordina este flujo principal del modulo.
export async function listUsers(_req, res, next) {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'], order: [['id', 'ASC']] })
    const searchTerm = String(_req.query?.q || '').trim().toLowerCase()
    const filteredUsers = searchTerm
      ? users.filter((item) =>
          [item.username, item.email, item.role]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(searchTerm)),
        )
      : users
    res.json(filteredUsers)
  } catch (error) {
    next(error)
  }
}

// getUser: coordina este flujo principal del modulo.
export async function getUser(req, res, next) {
  try {
    const userId = Number(req.params.id)
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const user = await User.findByPk(userId, { attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'] })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    return res.json(user)
  } catch (error) {
    next(error)
  }
}

// createUser: coordina este flujo principal del modulo.
export async function createUser(req, res, next) {
  try {
    const validationError = validateUserPayload(req.body)
    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const existing = await User.findOne({ where: { username: req.body.username } })
    if (existing) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe.' })
    }

    const passwordHash = bcrypt.hashSync(String(req.body.password), 10)

    const created = await User.create({
      username: String(req.body.username).trim().toLowerCase(),
      email: String(req.body.email).trim().toLowerCase(),
      passwordHash,
      role: String(req.body.role || 'user').trim(),
    })

    return res.status(201).json({
      id: created.id,
      username: created.username,
      email: created.email,
      role: created.role,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    })
  } catch (error) {
    next(error)
  }
}

// updateUser: coordina este flujo principal del modulo.
export async function updateUser(req, res, next) {
  try {
    const userId = Number(req.params.id)
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const validationError = validateUserPayload(req.body, { partial: true })
    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    const updates = {}
    if (req.body.username) {
      updates.username = String(req.body.username).trim().toLowerCase()
    }
    if (req.body.email) {
      updates.email = String(req.body.email).trim().toLowerCase()
    }
    if (req.body.role) {
      updates.role = String(req.body.role).trim()
    }
    if (req.body.password) {
      updates.passwordHash = bcrypt.hashSync(String(req.body.password), 10)
    }

    await user.update(updates)
    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } catch (error) {
    next(error)
  }
}

// deleteUser: coordina este flujo principal del modulo.
export async function deleteUser(req, res, next) {
  try {
    const userId = Number(req.params.id)
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ message: 'ID invalido.' })
    }

    const deletedRows = await User.destroy({ where: { id: userId } })
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

