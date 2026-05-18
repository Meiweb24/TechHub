/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\DealsSection.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { formatCOP } from '../utils/currency'

export default function DealsSection({ products, onAddToCart, onCategoryChange }) {
  const topDeals = [...products]
    .filter((item) => Number.isFinite(item.originalPrice) && item.originalPrice > item.price)
    .sort(
      (first, second) =>
        (second.originalPrice - second.price) / second.originalPrice -
        (first.originalPrice - first.price) / first.originalPrice,
    )
    .slice(0, 3)

  return (
    <section className="section deals" id="deals">
      <div className="container">
        <div className="section-heading">
          <h2>Ofertas activas</h2>
          <p>
            Descuentos reales por categoria con acceso rapido para agregar al carrito y
            explorar productos similares.
          </p>
        </div>

        <div className="deals-grid">
          {topDeals.map((item) => {
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)

            return (
              <article key={item.id} className="deal-card">
                <p className="deal-card__tag">{item.dealTag}</p>
                <h3>{item.name}</h3>
                <p className="deal-card__meta">
                  {item.categoryLabel} • Ahorra {discount}%
                </p>
                <div className="deal-card__price">
                  <strong>{formatCOP(item.price)}</strong>
                  <span>{formatCOP(item.originalPrice)}</span>
                </div>
                <div className="deal-card__actions">
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => onAddToCart(item.id)}>
                    Agregar oferta
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    onClick={() => onCategoryChange(item.category)}
                  >
                    Ir a categoria
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

