/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\CreativeLab.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
export default function CreativeLab() {
  const handleCategoryClick = (categoryId) => {
    window.location.href = `/tienda?category=${categoryId}#products`
  }

  return (
    <main className="lab-page">
      <section className="lab-hero">
        <div className="container lab-hero__inner">
          <p className="lab-kicker">Tech Hub - Home Oficial</p>
          <h1>Tu tienda tech para armar un setup potente, limpio y confiable</h1>
          <p>
            Compra perifericos de alto rendimiento con una experiencia rapida y clara:
            teclado, mouse, audio, monitores y accesorios seleccionados para Colombia.
          </p>
          <div className="lab-actions">
            <a href="/tienda" className="btn btn--primary btn--lg">
              Entrar a la tienda
            </a>
            <a href="/tienda?view=offers#deals" className="btn btn--secondary btn--lg">
              Ir a ofertas
            </a>
          </div>
        </div>
      </section>

      <section className="lab-strip">
  <div className="container lab-strip__grid">
    <button
      type="button"
      className="lab-card lab-card--keyboard"
      onClick={() => handleCategoryClick('keyboards')}
    >
      <div className="lab-card__icon">⌨️</div>
      <h2>Teclados</h2>
      <p>Textura, respuesta y sonido calibrado para productividad y juego.</p>
      <div className="lab-card__cta">
        Ver productos
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>

    <button
      type="button"
      className="lab-card lab-card--mouse"
      onClick={() => handleCategoryClick('mice')}
    >
      <div className="lab-card__icon">🖱️</div>
      <h2>Mouse</h2>
      <p>Control preciso y diseño ergonómico para sesiones intensas.</p>
      <div className="lab-card__cta">
        Ver productos
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>

    <button
      type="button"
      className="lab-card lab-card--audio"
      onClick={() => handleCategoryClick('headsets')}
    >
      <div className="lab-card__icon">🎧</div>
      <h2>Audio</h2>
      <p>Inmersión, claridad y comunicaciones limpias en cada partida.</p>
      <div className="lab-card__cta">
        Ver productos
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  </div>
</section>

      
    </main>
  )
}

