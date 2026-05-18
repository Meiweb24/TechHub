/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\AdminDashboard.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useAuth } from '../context/AuthContext'
import AdminStats from './AdminStats'
import AdminProductTable from './AdminProductTable'
import AdminUserTable from './AdminUserTable'
import AdminUploads from './AdminUploads'

// AdminDashboard: coordina este flujo principal del modulo.
export default function AdminDashboard() {
  const { logout } = useAuth()

  return (
    <main className="admin-page">
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h1>Panel de administracion</h1>
            <p>Gestiona productos, usuarios, archivos y visualiza analitica del inventario.</p>
          </div>

          <AdminStats />

          <AdminProductTable />

          <AdminUserTable />

          <AdminUploads />

          <div className="admin-actions">
            <a href="/tienda" className="btn btn--secondary">
              Volver a tienda
            </a>
            <button type="button" className="btn btn--primary" onClick={logout}>
              Cerrar sesion
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

