/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\Recommendations.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { formatCOP } from '../utils/currency'

export default function Recommendations({ products, onAddToCart, onOpenProduct, onCategoryChange }) {
  return (
    <section className="section recommendations" id="recommendations">
      <div className="container">
        <div className="section-heading">
          <h2>Recomendaciones inteligentes</h2>
          <p>
            Priorizadas segun tu carrito, categoria activa y productos destacados para
            que compres mas rapido y con mejor combinacion.
          </p>
        </div>

        <div className="recommend-grid">
          {products.length ? (
            products.map((item) => (
              <article key={item.id} className="recommend-card">
                <button className="recommend-card__media" type="button" onClick={() => onOpenProduct(item)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = '/product-fallback.svg'
                    }}
                  />
                </button>
                <div>
                  <button
                    type="button"
                    className="recommend-card__category"
                    onClick={() => onCategoryChange(item.category)}
                  >
                    {item.categoryLabel}
                  </button>
                  <h3>{item.name}</h3>
                  <p>{item.tagline}</p>
                  <div className="recommend-card__bottom">
                    <strong>{formatCOP(item.price)}</strong>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={() => onAddToCart(item.id)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Ya agregaste todo. Revisa Ofertas para nuevas oportunidades.</p>
          )}
        </div>
      </div>
    </section>
  )
}

