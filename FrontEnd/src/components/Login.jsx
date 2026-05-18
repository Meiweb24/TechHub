/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\Login.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, isAdmin, login, register, logout, authError, clearError } = useAuth()
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [robotChecked, setRobotChecked] = useState(false)
  const [infoMessage, setInfoMessage] = useState('')

  // Cierra el modal y limpia estados secundarios.
  const closeModal = () => {
    setShowModal(false)
    setRobotChecked(false)
    clearError()
    setInfoMessage('')
  }

  // Procesa el envio del formulario de login o registro.
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!robotChecked) {
      return
    }

    const cleanedUsername = username.trim().toLowerCase()
    const cleanedEmail = email.trim().toLowerCase()

    const result =
      mode === 'register'
        ? await register(cleanedUsername, cleanedEmail, password)
        : await login(cleanedUsername, password)

    if (result) {
      const role = result.role || 'user'
      const userLabel = result.username || cleanedUsername

      if (mode === 'register') {
        setInfoMessage(`Registro correcto. Usuario ${userLabel} creado como ${role}.`)
      } else if (role === 'admin') {
        setInfoMessage('Ingreso correcto. Redirigiendo al panel de administrador...')
      } else {
        setInfoMessage(`Bienvenido ${userLabel}. Eres usuario registrado.`)
      }

      setUsername('')
      setEmail('')
      setPassword('')
      setShowPassword(false)
      closeModal()
      setMode('login')

      if (result.role === 'admin') {
        window.history.pushState({}, '', '/admin')
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    } else {
      setInfoMessage('')
    }
  }

  if (user && !isAdmin) {
    return (
      <section className="section section--compact" id="admin">
        <div className="container">
          <div className="login-card login-card--active">
            <div>
              <h2>Usuario registrado activo</h2>
              <p>Has iniciado sesion como {user.username}. Puedes cerrar sesion cuando quieras.</p>
            </div>
            <div className="login-card__actions">
              <button type="button" className="btn btn--secondary" onClick={logout}>
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isAdmin) {
    return (
      <section className="section section--compact" id="admin">
        <div className="container">
          <div className="login-card login-card--active">
            <div>
              <h2>Modo admin activado</h2>
              <p>Ya puedes navegar tambien la ruta privada del panel administrativo.</p>
            </div>
            <div className="login-card__actions">
              <a href="/admin" className="btn btn--primary">
                Ir al panel privado
              </a>
              <button type="button" className="btn btn--secondary" onClick={logout}>
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section section--compact" id="admin">
      <div className="container">
        <div className="login-card">
          <div>
            <h2>{mode === 'register' ? 'Registro de usuario' : 'Invitado'}</h2>
            <p>Invitado. Inicia sesion o registrate para acceder a tu cuenta y funciones del sitio.</p>
          </div>
          <div className="login-card__actions">
            <button type="button" className="btn btn--primary" onClick={() => setShowModal(true)}>
              {mode === 'register' ? 'Abrir registro' : 'Abrir sesion'}
            </button>
          </div>
          {infoMessage ? <p className="login-success">{infoMessage}</p> : null}
          {authError ? <p className="login-error">{authError}</p> : null}
        </div>
      </div>

      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'register' ? 'Registro' : 'Iniciar sesion'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="adminUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
                required
              />
            </Form.Group>

            {mode === 'register' ? (
              <Form.Group className="mb-3" controlId="adminEmail">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Ingresa tu correo"
                  autoComplete="email"
                  required
                />
              </Form.Group>
            ) : null}

            <Form.Group className="mb-3" controlId="adminPass">
              <Form.Label>{mode === 'register' ? 'Contrasena' : 'Contrasena'}</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={mode === 'register' ? 'Crea una contrasena' : 'Ingresa tu contrasena'}
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  required
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="captchaCheck">
              <Form.Check
                type="checkbox"
                label="No soy un robot (simulado)"
                checked={robotChecked}
                onChange={(event) => setRobotChecked(event.target.checked)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={!robotChecked}>
              {mode === 'register' ? 'Crear cuenta' : 'Verificar ingreso'}
            </Button>
          </Form>

          <div className="mt-3">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setInfoMessage('')
                clearError()
              }}
            >
              {mode === 'login' ? 'No tienes cuenta? registrate' : 'Ya tengo cuenta'}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  )
}


