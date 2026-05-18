/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\Footer.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useState } from 'react'

const teamMembers = [
  {
    id: 'jmr',
    name: 'Juan Manuel Rivera Torres',
    role: 'Ingenieria de Sistemas',
    semester: '5to semestre',
    email: 'juan2240046@correo.uis.edu.co',
    photo: '/team/manu.jpeg',
  },
  {
    id: 'dr',
    name: 'Diego Rojas',
    role: 'Ingenieria de Sistemas',
    semester: '5to semestre',
    email: 'diego2241691@correo.uis.edu.co',
    photo: '/team/diego.jpeg',
  },
  {
    id: 'jeh',
    name: 'Juan Esteban Hernandez Velandia',
    role: 'Ingenieria de Sistemas',
    semester: '5to semestre',
    email: 'juan2240045@correo.uis.edu.co',
    photo: '/team/juanes.jpeg',
  },
  {
    id: 'jds',
    name: 'Juan David Salazar Pedrozo',
    role: 'Ingenieria de Sistemas',
    semester: '5to semestre',
    email: 'juan2241545@correo.uis.edu.co',
    photo: '/team/salazar.jpeg',
  },
]

export default function Footer() {
  const [activeMember, setActiveMember] = useState(teamMembers[0])

  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div>
          <h3>Tech Hub</h3>
          <p>Perifericos premium para workstations, gaming y productividad diaria.</p>

          <div className="team-switcher" role="group" aria-label="Miembros del equipo">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                className={activeMember.id === member.id ? 'is-active' : ''}
                onClick={() => setActiveMember(member)}
              >
                {member.name}
              </button>
            ))}
          </div>

          <article className="team-card fade-in-up">
            <img src={activeMember.photo} alt={`Foto de ${activeMember.name}`} loading="lazy" />
            <div>
              <h4>{activeMember.name}</h4>
              <p>
                {activeMember.role} - {activeMember.semester}
              </p>
              <a href={`mailto:${activeMember.email}`}>{activeMember.email}</a>
            </div>
          </article>
        </div>

        <div>
          <h3>Boletin y redes</h3>
          <p>Recibe lanzamientos y ofertas semanales antes de su publicacion.</p>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="tu-correo@ejemplo.com" aria-label="Correo" />
            <button type="submit" className="btn btn--primary btn--sm">
              Suscribirme
            </button>
          </form>

          <div className="social-links" aria-label="Redes sociales">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://github.com/Meiweb24/FrontEnd" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <p className="footer__copy">2026 Tech Hub. Construido con React + Vite.</p>
    </footer>
  )
}

