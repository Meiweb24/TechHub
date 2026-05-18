/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\ProductCard.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { formatCOP } from '../utils/currency'

export default function ProductCard({
  product,
  highlighted = false,
  onAddToCart,
  onOpenProduct,
  quantityInCart = 0,
}) {
  const hasDiscount =
    Number.isFinite(product.originalPrice) && Number(product.originalPrice) > Number(product.price)

  return (
    <article className={`product-card ${highlighted ? 'product-card--highlighted' : ''}`}>
      <button className="product-card__media" type="button" onClick={() => onOpenProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/product-fallback.svg'
          }}
        />
      </button>
      <div className="product-card__content">
        <div className="product-card__meta">
          <p className="product-card__category">{product.categoryLabel}</p>
          <span className={`discount-pill ${hasDiscount ? 'discount-pill--on' : ''}`}>
            {hasDiscount ? 'En descuento' : 'Precio regular'}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>
        <div className="product-card__bottom">
          <div className="product-card__price">
            <strong>{formatCOP(product.price)}</strong>
            {hasDiscount ? <span>{formatCOP(product.originalPrice)}</span> : null}
          </div>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onAddToCart(product.id)}>
            Agregar
          </button>
        </div>
        {quantityInCart > 0 ? <p className="in-cart-note">En carrito: {quantityInCart}</p> : null}
      </div>
    </article>
  )
}

