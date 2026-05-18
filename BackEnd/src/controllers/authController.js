/**
 * Archivo: BackEnd/src\controllers\authController.js
 * Proposito: Define la logica principal de authController dentro de TechHub.
 */
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'

// Controlador de autenticación: login y registro.
// El backend valida credenciales y devuelve datos de usuario sin exponer el hash.
export async function login(req, res, next) {
  try {
    const username = String(req.body.username || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son obligatorios.' })
    }

    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }

    const match = bcrypt.compareSync(password, user.passwordHash)
    if (!match) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }

    // No devolvemos passwordHash al cliente, solo metadata segura.
    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    next(error)
  }
}

// register: coordina este flujo principal del modulo.
export async function register(req, res, next) {
  try {
    const username = String(req.body.username || '').trim().toLowerCase()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Usuario, correo y contraseña son obligatorios.' })
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: 'Correo inválido.' })
    }

    const existing = await User.findOne({ where: { username } })
    if (existing) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe.' })
    }

    // Todos los usuarios que se registran por formulario reciben rol 'user'.
    const newUser = await User.create({
      username,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      role: 'user',
    })

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    })
  } catch (error) {
    next(error)
  }
}

