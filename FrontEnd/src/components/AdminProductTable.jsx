/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\components\AdminProductTable.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import '../styles/AdminProductTable.css'

const CATEGORY_OPTIONS = [
  { value: 'keyboards', label: 'Teclados', categoryLabel: 'Teclado' },
  { value: 'mice', label: 'Mouse', categoryLabel: 'Mouse' },
  { value: 'headsets', label: 'Audifonos', categoryLabel: 'Audifono' },
  { value: 'monitors', label: 'Monitores', categoryLabel: 'Monitor' },
  { value: 'accessories', label: 'Accesorios', categoryLabel: 'Accesorio' },
]

const EMPTY_FORM = {
  name: '',
  category: 'keyboards',
  categoryLabel: 'Teclado',
  price: '',
  originalPrice: '',
  image: '',
  tagline: '',
  dealTag: '',
  featured: false,
  adminOnly: false,
}

export default function AdminProductTable() {
  const { products, loading, error, usingFallback, createProduct, updateProduct, deleteProduct } = useProducts()

  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState(EMPTY_FORM)
  const [newProduct, setNewProduct] = useState(EMPTY_FORM)
  const [statusMessage, setStatusMessage] = useState('')
  const [actionError, setActionError] = useState('')

  const startEdit = (product) => {
    setEditingId(product.id)
    setEditDraft({
      name: product.name,
      category: product.category,
      categoryLabel: product.categoryLabel,
      price: String(product.price),
      originalPrice: product.originalPrice ?? '',
      image: product.image,
      tagline: product.tagline,
      dealTag: product.dealTag,
      featured: Boolean(product.featured),
      adminOnly: Boolean(product.adminOnly),
    })
    setActionError('')
    setStatusMessage('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditDraft(EMPTY_FORM)
  }

  const handleCategoryChange = (value, target = 'new') => {
    const selected = CATEGORY_OPTIONS.find((option) => option.value === value)
    if (!selected) {
      return
    }

    if (target === 'edit') {
      setEditDraft((prev) => ({ ...prev, category: selected.value, categoryLabel: selected.categoryLabel }))
      return
    }

    setNewProduct((prev) => ({ ...prev, category: selected.value, categoryLabel: selected.categoryLabel }))
  }

  const parseProductPayload = (draft) => ({
    ...draft,
    price: Number(draft.price),
    originalPrice: draft.originalPrice === '' ? null : Number(draft.originalPrice),
  })

  const validate = (draft) => {
    if (!draft.name || !draft.image || !draft.tagline || !draft.dealTag) {
      return 'Completa nombre, imagen, tagline y etiqueta de oferta.'
    }

    if (!Number.isFinite(Number(draft.price)) || Number(draft.price) <= 0) {
      return 'El precio debe ser mayor a 0.'
    }

    if (draft.originalPrice !== '' && (!Number.isFinite(Number(draft.originalPrice)) || Number(draft.originalPrice) <= 0)) {
      return 'El precio original debe ser vacio o mayor a 0.'
    }

    return ''
  }

  const saveEdit = async (productId) => {
    const validationError = validate(editDraft)
    if (validationError) {
      setActionError(validationError)
      return
    }

    try {
      await updateProduct(productId, parseProductPayload(editDraft))
      setStatusMessage('Producto actualizado correctamente.')
      setActionError('')
      cancelEdit()
    } catch (saveError) {
      setActionError(saveError.message)
    }
  }

  const createNewProduct = async (event) => {
    event.preventDefault()
    const validationError = validate(newProduct)
    if (validationError) {
      setActionError(validationError)
      return
    }

    try {
      await createProduct(parseProductPayload(newProduct))
      setNewProduct(EMPTY_FORM)
      setStatusMessage('Producto creado correctamente.')
      setActionError('')
    } catch (createError) {
      setActionError(createError.message)
    }
  }

  const removeProduct = async (productId) => {
    const confirmed = window.confirm('Seguro que deseas eliminar este producto?')
    if (!confirmed) {
      return
    }

    try {
      await deleteProduct(productId)
      setStatusMessage('Producto eliminado correctamente.')
      setActionError('')
    } catch (deleteError) {
      setActionError(deleteError.message)
    }
  }

  if (loading) {
    return <p className="admin-hint">Cargando inventario desde el backend...</p>
  }

  return (
    <div className="admin-product-table">
      <h2>Inventario de productos (CRUD)</h2>

      {usingFallback ? (
        <p className="admin-warning">
          Backend no disponible. Estas viendo datos locales y no se guardaran cambios reales.
        </p>
      ) : null}

      {error ? <p className="admin-warning">{error}</p> : null}
      {actionError ? <p className="admin-error">{actionError}</p> : null}
      {statusMessage ? <p className="admin-ok">{statusMessage}</p> : null}

      <form className="admin-create" onSubmit={createNewProduct}>
        <h3>Crear nuevo producto</h3>
        <div className="admin-create__grid">
          <input
            type="text"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(event) => setNewProduct((prev) => ({ ...prev, name: event.target.value }))}
          />
          <select
            value={newProduct.category}
            onChange={(event) => handleCategoryChange(event.target.value, 'new')}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(event) => setNewProduct((prev) => ({ ...prev, price: event.target.value }))}
          />
          <input
            type="number"
            min="1"
            placeholder="Precio original (opcional)"
            value={newProduct.originalPrice}
            onChange={(event) => setNewProduct((prev) => ({ ...prev, originalPrice: event.target.value }))}
          />
          <input
            type="url"
            placeholder="URL imagen"
            value={newProduct.image}
            onChange={(event) => setNewProduct((prev) => ({ ...prev, image: event.target.value }))}
          />
          <input
            type="text"
            placeholder="Tagline"
            value={newProduct.tagline}
            onChange={(event) => setNewProduct((prev) => ({ ...prev, tagline: event.target.value }))}
          />
          <input
            type="text"
            placeholder="Etiqueta oferta"
            value={newProduct.dealTag}
            onChange={(event) => setNewProduct((prev) => ({ ...prev, dealTag: event.target.value }))}
          />
          <label>
            <input
              type="checkbox"
              checked={newProduct.featured}
              onChange={(event) => setNewProduct((prev) => ({ ...prev, featured: event.target.checked }))}
            /> Destacado
          </label>
          <label>
            <input
              type="checkbox"
              checked={newProduct.adminOnly}
              onChange={(event) => setNewProduct((prev) => ({ ...prev, adminOnly: event.target.checked }))}
            /> Solo admin
          </label>
        </div>
        <button className="btn-small btn-save" type="submit">Crear producto</button>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Original</th>
              <th>Flags</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isEditing = editingId === product.id

              return (
                <tr key={product.id}>
                  <td>
                    <div className="product-name">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={editDraft.category}
                        onChange={(event) => handleCategoryChange(event.target.value, 'edit')}
                      >
                        {CATEGORY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      product.categoryLabel
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={editDraft.price}
                        onChange={(event) => setEditDraft((prev) => ({ ...prev, price: event.target.value }))}
                        className="price-input"
                      />
                    ) : (
                      <span className="price">${product.price.toLocaleString('es-CO')}</span>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        placeholder="Opcional"
                        value={editDraft.originalPrice}
                        onChange={(event) =>
                          setEditDraft((prev) => ({ ...prev, originalPrice: event.target.value }))
                        }
                        className="price-input"
                      />
                    ) : product.originalPrice ? (
                      <span className="discount">${product.originalPrice.toLocaleString('es-CO')}</span>
                    ) : (
                      <span className="no-discount">-</span>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <div className="flag-editor">
                        <label>
                          <input
                            type="checkbox"
                            checked={editDraft.featured}
                            onChange={(event) =>
                              setEditDraft((prev) => ({ ...prev, featured: event.target.checked }))
                            }
                          /> Destacado
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={editDraft.adminOnly}
                            onChange={(event) =>
                              setEditDraft((prev) => ({ ...prev, adminOnly: event.target.checked }))
                            }
                          /> Admin
                        </label>
                      </div>
                    ) : (
                      <span>{product.featured ? 'Destacado' : 'Normal'} / {product.adminOnly ? 'Admin' : 'Publico'}</span>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <div className="action-buttons">
                        <button className="btn-small btn-save" onClick={() => saveEdit(product.id)}>
                          Guardar
                        </button>
                        <button className="btn-small btn-cancel" onClick={cancelEdit}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button className="btn-small btn-edit" onClick={() => startEdit(product)}>
                          Editar
                        </button>
                        <button className="btn-small btn-danger" onClick={() => removeProduct(product.id)}>
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

