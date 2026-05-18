/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\CartDrawer.jsx
 * Proposito: Renderiza el carrito lateral, resumen de compra y sugerencias.
 */
import { formatCOP } from '../utils/currency'

// Componente controlado: recibe estado/acciones del padre y no persiste datos por si mismo.
export default function CartDrawer({
  open,
  items,
  subtotal,
  suggestions,
  onClose,
  onAdd,
  onRemove,
  onDelete,
}) {
  return (
    <>
      {/* Backdrop para cerrar el drawer al hacer click fuera */}
      <div
        className={`cart-backdrop ${open ? 'cart-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`} aria-hidden={!open}>
        <header className="cart-drawer__header">
          <h2>Tu carrito</h2>
          <button type="button" className="cart-drawer__close" onClick={onClose} aria-label="Cerrar carrito">
            ?
          </button>
        </header>

        <div className="cart-drawer__body">
          {items.length ? (
            items.map((item) => (
              <article key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(event) => {
                    event.currentTarget.src = '/product-fallback.svg'
                  }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{formatCOP(item.price)} c/u</p>
                  <div className="cart-item__controls">
                    {/* Ajuste de cantidad por item */}
                    <button type="button" onClick={() => onRemove(item.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onAdd(item.id)}>
                      +
                    </button>
                    <button type="button" className="cart-item__remove" onClick={() => onDelete(item.id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Tu carrito esta vacio.</p>
          )}
        </div>

        {suggestions?.length ? (
          <>
            {/* Sugerencias rapidas derivadas del contenido actual del carrito. */}
          <section className="cart-suggestions" aria-label="Sugeridos en carrito">
            <h3>Sugeridos para complementar</h3>
            <div className="cart-suggestions__list">
              {suggestions.map((item) => (
                <button key={item.id} type="button" className="cart-suggestion" onClick={() => onAdd(item.id)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src = '/product-fallback.svg'
                    }}
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </section>
          </>
        ) : null}

        <footer className="cart-drawer__footer">
          <p>
            Subtotal <strong>{formatCOP(subtotal)}</strong>
          </p>
          <button type="button" className="btn btn--primary btn--md">
            Finalizar compra
          </button>
        </footer>
      </aside>
    </>
  )
}

