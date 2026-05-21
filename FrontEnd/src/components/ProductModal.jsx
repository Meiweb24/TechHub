/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\ProductModal.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { formatCOP } from '../utils/currency'

function buildSpecs(product) {
  const base = [
    `Categoria: ${product.categoryLabel}`,
    `Precio actual: ${formatCOP(product.price)}`,
  ]

  if (product.originalPrice) {
    base.push(`Precio de referencia: ${formatCOP(product.originalPrice)}`)
  }

  if (product.category === 'keyboards') {
    base.push('Formato optimizado para escritura y sesiones de juego largas.')
    base.push('Construccion enfocada en respuesta estable y tacto consistente.')
  }

  if (product.category === 'mice') {
    base.push('Sensor de alta precision para control fino en trabajo o gaming.')
    base.push('Ergonomia pensada para reducir fatiga en uso continuo.')
  }

  if (product.category === 'headsets') {
    base.push('Perfil de audio equilibrado para musica, llamadas y juego competitivo.')
    base.push('Microfono con captura clara para reuniones y streaming.')
  }

  if (product.category === 'monitors') {
    base.push('Panel orientado a nitidez, contraste estable y visualizacion prolongada.')
    base.push('Ideal para multitarea, edicion y entretenimiento inmersivo.')
  }

  if (product.category === 'accessories') {
    base.push('Complemento pensado para mejorar flujo de trabajo y orden del setup.')
    base.push('Materiales seleccionados para uso diario intensivo.')
  }

  return base
}

// ProductModal: coordina este flujo principal del modulo.
export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) {
    return null
  }

  const specs = buildSpecs(product)

  return (
    <div className="product-modal" role="dialog" aria-modal="true" aria-label={`Detalle de ${product.name}`}>
      <button className="product-modal__backdrop" type="button" onClick={onClose} aria-label="Cerrar" />
      <article className="product-modal__card">
        <button className="product-modal__close" type="button" onClick={onClose} aria-label="Cerrar modal">
          ×
        </button>
        <div className="product-modal__grid">
          <div className="product-modal__media">
            <img
              src={product.image}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = '/product-fallback.svg'
              }}
            />
          </div>
          <div className="product-modal__content">
            <p className="product-modal__category">{product.categoryLabel}</p>
            <h2>{product.name}</h2>
            <p className="product-modal__tagline">{product.tagline}</p>
            <p className="product-modal__description">
              {product.name} fue seleccionado para usuarios que buscan equilibrio entre rendimiento,
              durabilidad y una experiencia profesional. Es una opcion ideal para setups modernos
              que exigen resultados consistentes en trabajo, estudio o juego.
            </p>
            <ul className="product-modal__specs">
              {specs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="product-modal__actions">
              <strong>{formatCOP(product.price)}</strong>
              <button className="btn btn--primary btn--md" type="button" onClick={() => onAddToCart(product.id)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

