/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\context\AuthContext.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginApi, registerUser as registerApi } from '../services/authApi'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'techhub_auth_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState('')

  // Al iniciar la app, restaurar sesión desde localStorage si existe.
  useEffect(() => {
    const saved = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (_error) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [])

  // Login con el backend. Si es correcto, guarda el usuario en el contexto.
  const login = async (username, password) => {
    try {
      const authenticatedUser = await loginApi(username, password)
      setUser(authenticatedUser)
      setAuthError('')
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser))
      return authenticatedUser
    } catch (error) {
      setUser(null)
      setAuthError(error.message)
      return null
    }
  }

  // Registro de nuevo usuario. El nuevo usuario recibe rol user.
  const register = async (username, email, password) => {
    try {
      const registeredUser = await registerApi({ username, email, password })
      setUser(registeredUser)
      setAuthError('')
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(registeredUser))
      return registeredUser
    } catch (error) {
      setUser(null)
      setAuthError(error.message)
      return null
    }
  }

  const logout = () => {
    setUser(null)
    setAuthError('')
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const clearError = () => {
    setAuthError('')
  }

  const value = useMemo(
    () => ({
      isAdmin: user?.role === 'admin',
      user,
      authError,
      login,
      register,
      logout,
      clearError,
    }),
    [authError, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}

