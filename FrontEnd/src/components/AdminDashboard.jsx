/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\AdminDashboard.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useAuth } from '../context/AuthContext'
import AdminStats from './AdminStats'
import AdminProductTable from './AdminProductTable'
import AdminUserTable from './AdminUserTable'
import AdminUploads from './AdminUploads'

export default function AdminDashboard() {
  const { logout } = useAuth()

  return (
    <main className="admin-page">
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h1>Panel de administraciÃ³n</h1>
            <p>Gestiona productos, usuarios, archivos y visualiza analÃ­tica del inventario.</p>
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
              Cerrar sesiÃ³n
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

