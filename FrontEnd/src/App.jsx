/**
 * Archivo: C:\Users\jmanu\OneDrive\Desktop\programacion\TechHub\FrontEnd\src\App.jsx
 * Proposito: Implementa parte de la logica y flujo principal de TechHub.
 */
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryMenu from './components/CategoryMenu'
import ProductGrid from './components/ProductGrid'
import Login from './components/Login'
import AdminBanner from './components/AdminBanner'
import Footer from './components/Footer'
import DealsSection from './components/DealsSection'
import CartDrawer from './components/CartDrawer'
import ProductModal from './components/ProductModal'
import CreativeLab from './components/CreativeLab'
import FeatureShowcase from './components/FeatureShowcase'
import AdminDashboard from './components/AdminDashboard'
import SatisfactionForm from './components/SatisfactionForm'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProductProvider, useProducts } from './context/ProductContext'
import { categories } from './data/products'
import './App.css'

// Storefront: orquesta la experiencia de tienda (filtros, carrito, listados y vistas para admin/visitante).
function Storefront() {
  const { isAdmin } = useAuth()
  const { products, loading: productsLoading } = useProducts()
  // Estado de filtros y UI.
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  // Estado del carrito persistido por tipo de usuario.
  const [cartItems, setCartItems] = useState([])
  const [cartLoaded, setCartLoaded] = useState(false)
  const [sortOption, setSortOption] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [mobileColumns, setMobileColumns] = useState(2)
  // Clave separada: evita mezclar carrito admin con carrito visitante.
  const cartStorageKey = isAdmin ? 'techhub_cart_admin' : 'techhub_cart_guest'

  useEffect(() => {
    // Hidrata filtros iniciales desde query params/hash.
    const validCategoryIds = new Set(categories.map((category) => category.id))
    const params = new URLSearchParams(window.location.search)
    const categoryFromUrl = params.get('category')
    const viewFromUrl = params.get('view')

    if (categoryFromUrl && validCategoryIds.has(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl)
    } else {
      setActiveCategory('all')
    }

    if (viewFromUrl === 'offers') {
      setSortOption('discount')
    }

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      window.setTimeout(() => {
        const target = document.getElementById(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
    }
  }, [])

  useEffect(() => {
    // Carga carrito persistido.
    try {
      const saved = window.localStorage.getItem(cartStorageKey)
      if (!saved) {
        setCartItems([])
        setCartLoaded(true)
        return
      }
      const parsed = JSON.parse(saved)
      const normalized = Array.isArray(parsed)
        ? parsed
            .filter((item) => Number.isInteger(item?.id) && Number.isInteger(item?.quantity))
            .map((item) => ({ id: item.id, quantity: Math.max(1, item.quantity) }))
        : []
      setCartItems(normalized)
    } catch (_error) {
      setCartItems([])
    } finally {
      setCartLoaded(true)
    }
  }, [cartStorageKey])

  useEffect(() => {
    // Persiste carrito solo despues de la carga inicial para no sobrescribir datos previos.
    if (!cartLoaded) {
      return
    }
    window.localStorage.setItem(cartStorageKey, JSON.stringify(cartItems))
  }, [cartItems, cartLoaded, cartStorageKey])

  // Visitantes no ven productos marcados como adminOnly.
  const allowedProducts = products.filter((item) => (isAdmin ? true : !item.adminOnly))

  // Filtrado por categoria + busqueda textual.
  const filteredProducts = allowedProducts.filter((item) => {
    const passCategory = activeCategory === 'all' || item.category === activeCategory
    const passSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())

    return passCategory && passSearch
  })

  // Ordenamiento configurable desde la UI de catalogo.
  const visibleProducts = [...filteredProducts].sort((first, second) => {
    if (sortOption === 'az') {
      return first.name.localeCompare(second.name, 'es-CO')
    }

    if (sortOption === 'za') {
      return second.name.localeCompare(first.name, 'es-CO')
    }

    if (sortOption === 'price-asc') {
      return first.price - second.price
    }

    if (sortOption === 'price-desc') {
      return second.price - first.price
    }

    if (sortOption === 'discount') {
      const firstDiscount =
        first.originalPrice && first.originalPrice > first.price
          ? (first.originalPrice - first.price) / first.originalPrice
          : 0
      const secondDiscount =
        second.originalPrice && second.originalPrice > second.price
          ? (second.originalPrice - second.price) / second.originalPrice
          : 0

      if (secondDiscount !== firstDiscount) {
        return secondDiscount - firstDiscount
      }
    }

    if (first.featured !== second.featured) {
      return Number(second.featured) - Number(first.featured)
    }

    return first.name.localeCompare(second.name, 'es-CO')
  })

  // Bloques derivados para secciones del home.
  const featuredProducts = filteredProducts.filter((item) => item.featured).slice(0, 4)
  const adminProducts = products.filter((item) => item.adminOnly)

  const addToCart = (productId) => {
    // Proteccion: no permitir agregar ids fuera del conjunto visible/autorizado.
    const exists = allowedProducts.some((item) => item.id === productId)

    if (!exists) {
      return
    }

    setCartItems((prev) => {
      const current = prev.find((item) => item.id === productId)

      if (current) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...prev, { id: productId, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const removeOneFromCart = (productId) => {
    setCartItems((prev) => {
      return prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0)
    })
  }

  const removeLineFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartDetailItems = cartItems
    .map((entry) => {
      const product = allowedProducts.find((item) => item.id === entry.id)

      if (!product) {
        return null
      }

      return {
        ...product,
        quantity: entry.quantity,
      }
    })
    .filter(Boolean)

  // Metricas resumidas del carrito para navbar y drawer.
  const cartCount = cartDetailItems.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cartDetailItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const cartCategoryWeights = cartDetailItems.reduce((accumulator, item) => {
    const current = accumulator[item.category] ?? 0
    return { ...accumulator, [item.category]: current + item.quantity }
  }, {})

  const cartIdSet = new Set(cartDetailItems.map((item) => item.id))

  // Recomendador simple: prioriza misma categoria del carrito y productos destacados.
  const cartSuggestions = [...allowedProducts]
    .filter((item) => !cartIdSet.has(item.id))
    .sort((first, second) => {
      const firstWeight = cartCategoryWeights[first.category] ?? 0
      const secondWeight = cartCategoryWeights[second.category] ?? 0

      if (secondWeight !== firstWeight) {
        return secondWeight - firstWeight
      }

      if (second.featured !== first.featured) {
        return Number(second.featured) - Number(first.featured)
      }

      return first.price - second.price
    })
    .slice(0, 2)

  const quantityById = cartDetailItems.reduce((accumulator, item) => {
    return { ...accumulator, [item.id]: item.quantity }
  }, {})

  return (
    <div className="app-shell">
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen((value) => !value)}
        cartOpen={cartOpen}
      />

      <CartDrawer
        open={cartOpen}
        items={cartDetailItems}
        subtotal={cartSubtotal}
        suggestions={cartSuggestions}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeOneFromCart}
        onDelete={removeLineFromCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <main>
        <Hero />
        <FeatureShowcase products={allowedProducts} />
        <DealsSection
          products={allowedProducts}
          onAddToCart={addToCart}
          onCategoryChange={setActiveCategory}
        />

        <section className="products-zone">
          {productsLoading ? (
            <p className="container empty-state">Cargando productos desde el backend...</p>
          ) : null}

          <CategoryMenu
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            mobileColumns={mobileColumns}
            onMobileColumnsChange={setMobileColumns}
          />

          <ProductGrid
            title="Productos destacados"
            description="Selecciones rapidas para comprar con confianza y rendimiento comprobado."
            products={featuredProducts}
            sectionId="featured"
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
            quantityById={quantityById}
            mobileColumns={mobileColumns}
          />

          <ProductGrid
            title="Catalogo completo"
            description="Explora por categoria con tarjetas claras y acciones de compra rapidas."
            products={visibleProducts}
            sectionId="products"
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
            quantityById={quantityById}
            mobileColumns={mobileColumns}
          />
        </section>

        {isAdmin ? <AdminBanner /> : null}

        {isAdmin ? (
          <ProductGrid
            title="Descuentos de administracion"
            description="Bloques ocultos para campanas privadas y clientes especiales."
            products={adminProducts}
            highlightAdmin
            sectionId="admin-discounts"
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
            quantityById={quantityById}
            mobileColumns={mobileColumns}
          />
        ) : null}

        <section className="section promo-cta">
          <div className="container promo-cta__inner">
            <div>
              <h2>Necesitas recomendaciones personalizadas?</h2>
              <p>
                Cuentanos tu caso de uso y te preparamos un bundle de perifericos ideal
                para trabajo, estudio o gaming.
              </p>
            </div>
            <a href="#contact" className="btn btn--primary btn--md">
              Pedir asesoria
            </a>
          </div>
        </section>

        <SatisfactionForm />

        <Login />
      </main>

      <Footer />
    </div>
  )
}

// Router SPA liviano sin dependencia externa (intercepta enlaces internos y popstate).
function AppRouter() {
  const { isAdmin } = useAuth()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    if (path === '/lab') {
      window.history.replaceState({}, '', '/')
      setPath('/')
    }
  }, [path])

  useEffect(() => {
    if (path === '/admin' && !isAdmin) {
      // Si un visitante no admin intenta entrar en /admin, lo redirigimos
      // a la tienda y le mostramos un mensaje claro de acceso denegado.
      window.history.replaceState({}, '', '/tienda?auth=required#admin')
      setPath('/tienda')

      window.setTimeout(() => {
        const target = document.getElementById('admin')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 40)
    }
  }, [isAdmin, path])

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    // Intercepta clicks en anchors internos para navegar sin recarga completa.
    const intercept = (event) => {
      const anchor = event.target.closest('a[href^="/"]')
      if (!anchor) {
        return
      }
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('//') || anchor.target === '_blank') {
        return
      }
      event.preventDefault()
      window.history.pushState({}, '', href)
      setPath(window.location.pathname)

      const hashIndex = href.indexOf('#')
      const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : ''

      if (hash) {
        window.setTimeout(() => {
          const target = document.getElementById(hash)
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 40)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    document.addEventListener('click', intercept)
    return () => document.removeEventListener('click', intercept)
  }, [])

  if (path === '/tienda') {
    return <Storefront />
  }

  if (path === '/admin') {
    return isAdmin ? <AdminDashboard /> : <Storefront />
  }

  return <CreativeLab />
}

// App: coordina este flujo principal del modulo.
export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppRouter />
      </ProductProvider>
    </AuthProvider>
  )
}

