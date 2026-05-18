/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\ProductGrid.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import ProductCard from './ProductCard'

export default function ProductGrid({
  title,
  description,
  products,
  highlightAdmin = false,
  sectionId = 'products',
  onAddToCart,
  onOpenProduct,
  quantityById = {},
  mobileColumns = 2,
}) {
  return (
    <section className="section" id={sectionId}>
      <div className="container">
        <div className="section-heading">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={`product-grid ${mobileColumns === 1 ? 'product-grid--mobile-1' : ''}`}>
          {products.length ? (
            products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                highlighted={highlightAdmin && item.adminOnly}
                onAddToCart={onAddToCart}
                onOpenProduct={onOpenProduct}
                quantityInCart={quantityById[item.id] ?? 0}
              />
            ))
          ) : (
            <p className="empty-state">No encontramos productos para esos filtros.</p>
          )}
        </div>
      </div>
    </section>
  )
}

