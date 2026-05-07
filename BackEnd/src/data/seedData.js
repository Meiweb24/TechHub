export const categories = [
  { id: 'all', label: 'All' },
  { id: 'keyboards', label: 'Teclados' },
  { id: 'mice', label: 'Mouse' },
  { id: 'headsets', label: 'Audifonos' },
  { id: 'monitors', label: 'Monitores' },
  { id: 'accessories', label: 'Accesorios' },
]

export const products = [
  {
    name: 'AeroType Pro 75', category: 'keyboards', categoryLabel: 'Teclado', price: 203000, originalPrice: 345000,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Distribucion mecanica hot-swap.', dealTag: 'Bajada semanal',
  },
  {
    name: 'Pulse X3 Wireless', category: 'mice', categoryLabel: 'Mouse', price: 120000, originalPrice: 217000,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Ultraliviano con sensor de alta precision.', dealTag: 'Flash deal',
  },
  {
    name: 'Nova Surround One', category: 'headsets', categoryLabel: 'Audifono', price: 240000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Audio espacial y conexion de baja latencia.', dealTag: 'Precio estable',
  },
]
