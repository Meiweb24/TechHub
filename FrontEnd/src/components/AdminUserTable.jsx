/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\AdminUserTable.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useEffect, useState } from 'react'
import { createUser, deleteUser, listUsers, updateUser } from '../services/usersApi'

const EMPTY_USER = {
  username: '',
  email: '',
  password: '',
  role: 'user',
}

export default function AdminUserTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState(EMPTY_USER)
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState(EMPTY_USER)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetMessages = () => {
    setError('')
    setMessage('')
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    resetMessages()

    if (!newUser.username || !newUser.email || !newUser.password) {
      setError('Completa usuario, correo y Contrasena.')
      return
    }

    try {
      await createUser(newUser)
      setNewUser(EMPTY_USER)
      setMessage('Usuario creado exitosamente.')
      loadUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (user) => {
    setEditingId(user.id)
    setEditDraft({ username: user.username, email: user.email, password: '', role: user.role })
    resetMessages()
  }

  const saveEdit = async (userId) => {
    resetMessages()
    try {
      const payload = {
        username: editDraft.username,
        email: editDraft.email,
        role: editDraft.role,
      }
      if (editDraft.password) {
        payload.password = editDraft.password
      }

      await updateUser(userId, payload)
      setEditingId(null)
      setEditDraft(EMPTY_USER)
      setMessage('Usuario actualizado correctamente.')
      loadUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  const removeUser = async (userId) => {
    const confirmed = window.confirm('Eliminar este usuario?')
    if (!confirmed) return
    resetMessages()
    try {
      await deleteUser(userId)
      setMessage('Usuario eliminado.')
      loadUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="admin-section">
      <h2>Gestion de usuarios</h2>
      {message ? <p className="admin-ok">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      <form className="admin-create" onSubmit={handleCreate}>
        <div className="admin-create__grid">
          <input
            type="text"
            placeholder="Usuario"
            value={newUser.username}
            onChange={(event) => setNewUser((prev) => ({ ...prev, username: event.target.value }))}
          />
          <input
            type="email"
            placeholder="Correo"
            value={newUser.email}
            onChange={(event) => setNewUser((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            type="password"
            placeholder="Contrasena"
            value={newUser.password}
            onChange={(event) => setNewUser((prev) => ({ ...prev, password: event.target.value }))}
          />
          <select
            value={newUser.role}
            onChange={(event) => setNewUser((prev) => ({ ...prev, role: event.target.value }))}
          >
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn-small btn-save" type="submit">Crear usuario</button>
      </form>

      {loading ? (
        <p className="admin-hint">Cargando usuarios...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isEditing = editingId === user.id
                return (
                  <tr key={user.id}>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editDraft.username}
                          onChange={(event) => setEditDraft((prev) => ({ ...prev, username: event.target.value }))}
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editDraft.email}
                          onChange={(event) => setEditDraft((prev) => ({ ...prev, email: event.target.value }))}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          value={editDraft.role}
                          onChange={(event) => setEditDraft((prev) => ({ ...prev, role: event.target.value }))}
                        >
                          <option value="user">Usuario</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <div className="action-buttons">
                          <button className="btn-small btn-save" onClick={() => saveEdit(user.id)}>
                            Guardar
                          </button>
                          <button className="btn-small btn-cancel" onClick={() => setEditingId(null)}>
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button className="btn-small btn-edit" onClick={() => handleEdit(user)}>
                            Editar
                          </button>
                          <button className="btn-small btn-danger" onClick={() => removeUser(user.id)}>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

