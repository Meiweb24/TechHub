/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\AdminStats.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useProducts } from '../context/ProductContext'
import '../styles/AdminStats.css'

// AdminStats: coordina este flujo principal del modulo.
export default function AdminStats() {
  const { getProductStats } = useProducts()
  const stats = getProductStats()

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="admin-stats">
      <h2>Analitica del inventario</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total de productos</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Precio promedio</h3>
            <p className="stat-value">{formatCurrency(stats.avgPrice)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div className="stat-content">
            <h3>Productos en oferta</h3>
            <p className="stat-value">{stats.onSale}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Productos destacados</h3>
            <p className="stat-value">{stats.featured}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

