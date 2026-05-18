/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\SatisfactionForm.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function SatisfactionForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    score: '5',
    comment: '',
  })

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
    setForm({
      name: '',
      email: '',
      score: '5',
      comment: '',
    })
  }

  return (
    <section className="section section--compact satisfaction" id="satisfaccion">
      <div className="container">
        <div className="section-heading">
          <h2>Formulario de satisfaccion</h2>
          <p>Comparte tu experiencia para seguir mejorando la tienda.</p>
        </div>

        <div className="satisfaction-card fade-in-up">
          {sent ? <Alert variant="success">Gracias, recibimos tu opinion exitosamente.</Alert> : null}

          <Form onSubmit={handleSubmit}>
            <div className="satisfaction-grid">
              <Form.Group controlId="feedbackName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="feedbackEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="feedbackScore">
                <Form.Label>Calificacion general</Form.Label>
                <Form.Select
                  value={form.score}
                  onChange={(event) => updateField('score', event.target.value)}
                >
                  <option value="5">Excelente</option>
                  <option value="4">Muy buena</option>
                  <option value="3">Buena</option>
                  <option value="2">Regular</option>
                  <option value="1">Por mejorar</option>
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Group controlId="feedbackComment" className="mt-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                value={form.comment}
                onChange={(event) => updateField('comment', event.target.value)}
              />
            </Form.Group>

            <Button className="mt-3" variant="dark" type="submit">
              Enviar opinion
            </Button>
          </Form>
        </div>
      </div>
    </section>
  )
}

