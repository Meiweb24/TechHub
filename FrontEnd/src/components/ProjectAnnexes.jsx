/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\ProjectAnnexes.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
export default function ProjectAnnexes() {
  return (
    <section className="section section--compact annexes" id="anexos">
      <div className="container annexes__grid">
        <article className="annex-card">
          <h2>ANEXO1 - Principios de diseno aplicados</h2>
          <ul>
            <li>Contraste alto entre tipografia y fondos para lectura clara.</li>
            <li>Jerarquia visual con tamano, peso tipografico y espacios consistentes.</li>
            <li>Navegacion fija para mantener acceso al menu y acciones principales.</li>
            <li>Diseno responsive para desktop, tablet y movil.</li>
          </ul>
        </article>

        <article className="annex-card">
          <h2>ANEXO2 - Funcionalidades implementadas</h2>
          <ul>
            <li>Implementadas: router publico/privado, login modal, carrusel, acordeon, collapse y popover.</li>
            <li>Implementadas: dropdown, modal de producto, video, audio, footer con equipo y redes sociales.</li>
            <li>Pendiente de fase posterior: conexion real a base de datos y autenticacion backend.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

