/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\context\ProductContext.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products as initialProducts } from '../data/products'
import {
  fetchProducts,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from '../services/productsApi'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadProducts() {
      setLoading(true)
      setError('')

      try {
        const remoteProducts = await fetchProducts()
        if (!mounted) {
          return
        }
        setProducts(remoteProducts)
        setUsingFallback(false)
      } catch (_loadError) {
        if (!mounted) {
          return
        }

        setProducts(initialProducts)
        setUsingFallback(true)
        setError('No se pudo conectar al backend. Se usan datos locales temporales.')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

  const updateProduct = async (productId, updates) => {
    const updated = await updateProductApi(productId, updates)
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === productId ? updated : product)),
    )

    return updated
  }

  const toggleFeatured = async (productId) => {
    const current = products.find((product) => product.id === productId)
    if (!current) {
      return null
    }

    return updateProduct(productId, { featured: !current.featured })
  }

  const updatePrice = async (productId, newPrice) => {
    return updateProduct(productId, { price: newPrice })
  }

  const createProduct = async (payload) => {
    const created = await createProductApi(payload)
    setProducts((prevProducts) => [...prevProducts, created])
    return created
  }

  const deleteProduct = async (productId) => {
    await deleteProductApi(productId)
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
  }

  const getProductStats = () => {
    const totalProducts = products.length
    const avgPrice = totalProducts > 0 ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts : 0
    const onSale = products.filter((p) => p.originalPrice && p.originalPrice > p.price).length
    const featured = products.filter((p) => p.featured).length

    return { totalProducts, avgPrice, onSale, featured }
  }

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      usingFallback,
      createProduct,
      updateProduct,
      toggleFeatured,
      updatePrice,
      deleteProduct,
      getProductStats,
    }),
    [products, loading, error, usingFallback],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider')
  }
  return context
}

