/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\Hero.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
export default function Hero() {
  return (
    <section className="hero" aria-label="Promocion destacada">
      <div className="container hero__grid">
        <article className="hero__main">
          <p className="eyebrow">Ofertas especiales para setups de alto rendimiento</p>
          <h1>Sube de nivel tu escritorio con tecnologia precisa</h1>
          <p>
            Descubre teclados premium, mouse de baja latencia, headsets inmersivos y
            monitores pensados para creadores y gamers.
          </p>
          <div className="hero__actions">
            <a href="#products" className="btn btn--primary btn--lg">
              Comprar ahora
            </a>
            
          </div>
        </article>
        <aside className="hero__spotlight">
          <span className="hero__badge">Acceso anticipado</span>
          <h2>Ahorra hasta 40%</h2>
          <p>Tech Hub lanza nuevos bundles cada semana con alertas de stock prioritario.</p>
        </aside>
      </div>
    </section>
  )
}

