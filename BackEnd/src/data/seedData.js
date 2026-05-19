/**
 * Archivo: BackEnd/src\data\seedData.js
 * Proposito: Define la logica principal de seedData dentro de TechHub.
 */
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
  {
    name: 'VisionEdge 27 QHD', category: 'monitors', categoryLabel: 'Monitor', price: 516000, originalPrice: 851000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Panel preciso de color con 170Hz.', dealTag: 'Eleccion creator',
  },
  {
    name: 'DockHub 9-in-1', category: 'accessories', categoryLabel: 'Accesorio', price: 96000, originalPrice: 174000,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Un cable para energia, video y datos.', dealTag: 'Upgrade escritorio',
  },
  {
    name: 'Spectra Keycap Kit', category: 'accessories', categoryLabel: 'Accesorio', price: 65000, originalPrice: 118000,
    image: 'https://images.unsplash.com/photo-1616628188550-808682f40f23?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: true, tagline: 'Pack de keycaps con descuento privado.', dealTag: 'Descuento oculto',
  },
  {
    name: 'Phantom Rapid 60', category: 'keyboards', categoryLabel: 'Teclado', price: 172000, originalPrice: 303000,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: true, tagline: 'Stock limitado para clientes premium.', dealTag: 'Acceso privado',
  },
  {
    name: 'Luma ProPad XL', category: 'accessories', categoryLabel: 'Accesorio', price: 34000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Superficie microtexturizada para deslizamiento suave.', dealTag: 'Precio estable',
  },
  {
    name: 'Titan 87 RGB', category: 'keyboards', categoryLabel: 'Teclado', price: 182000, originalPrice: 331000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Teclado TKL con switches lineales silenciosos.', dealTag: 'Mas vendido',
  },
  {
    name: 'Rift V2 Ergonomic', category: 'mice', categoryLabel: 'Mouse', price: 100000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Diseno ergonomico para sesiones largas.', dealTag: 'Precio estable',
  },
  {
    name: 'EchoStudio ANC', category: 'headsets', categoryLabel: 'Audifono', price: 282000, originalPrice: 472000,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Cancelacion de ruido activa para foco total.', dealTag: 'Top audio',
  },
  {
    name: 'FrameSync 32 UltraWide', category: 'monitors', categoryLabel: 'Monitor', price: 653000, originalPrice: 1087000,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Panel ultrawide para multitarea y gaming.', dealTag: 'Ultra ahorro',
  },
  {
    name: 'CableFlex USB-C Pro', category: 'accessories', categoryLabel: 'Accesorio', price: 25000, originalPrice: 47000,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Cable reforzado con carga rapida 100W.', dealTag: 'Combo cable',
  },
  {
    name: 'Stand Arc Alum', category: 'accessories', categoryLabel: 'Accesorio', price: 51000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1616628188550-808682f40f23?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Soporte premium para elevar tu setup.', dealTag: 'Precio estable',
  },
  {
    name: 'Quantum Keys 98', category: 'keyboards', categoryLabel: 'Teclado', price: 223000, originalPrice: 378000,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Layout completo con rueda de volumen metalica.', dealTag: 'Edicion pro',
  },
  {
    name: 'SwiftClick Mini', category: 'mice', categoryLabel: 'Mouse', price: 72000, originalPrice: 132000,
    image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Mouse compacto para movilidad total.', dealTag: 'Portabilidad',
  },
  {
    name: 'StormMic USB', category: 'accessories', categoryLabel: 'Accesorio', price: 110000, originalPrice: 208000,
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Microfono plug-and-play para streaming.', dealTag: 'Creator kit',
  },
  {
    name: 'DualView 24 IPS', category: 'monitors', categoryLabel: 'Monitor', price: 361000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Ideal para oficinas y estudio de diseno.', dealTag: 'Precio estable',
  },
  {
    name: 'CloudBeat Lite', category: 'headsets', categoryLabel: 'Audifono', price: 130000, originalPrice: 236000,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Audio claro con microfono retractil.', dealTag: 'Entrada gamer',
  },
  {
    name: 'HyperPad Control XXL', category: 'accessories', categoryLabel: 'Accesorio', price: 44000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Superficie extendida para teclado y mouse.', dealTag: 'Precio estable',
  },
  {
    name: 'VoltMouse 8K', category: 'mice', categoryLabel: 'Mouse', price: 151000, originalPrice: 279000,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Polling rate 8K para maxima precision.', dealTag: 'Competitivo',
  },
  {
    name: 'CoreSound Studio', category: 'headsets', categoryLabel: 'Audifono', price: 320000, originalPrice: 543000,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Perfil de audio profesional y comodo.', dealTag: 'Audio pro',
  },
  {
    name: 'NightRGB Strip Kit', category: 'accessories', categoryLabel: 'Accesorio', price: 31000, originalPrice: 61000,
    image: 'https://images.unsplash.com/photo-1616628188550-808682f40f23?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: true, tagline: 'Iluminacion ambiental sincronizable.', dealTag: 'Solo admin',
  },
  {
    name: 'Atlas Mount Arm', category: 'accessories', categoryLabel: 'Accesorio', price: 89000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Brazo ajustable para monitor hasta 32".', dealTag: 'Precio estable',
  },
  {
    name: 'Nebula 34 Curved', category: 'monitors', categoryLabel: 'Monitor', price: 825000, originalPrice: 1348000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    featured: true, adminOnly: false, tagline: 'Panel curvo inmersivo para productividad total.', dealTag: 'Alta gama',
  },
  {
    name: 'MonoKey Silent 65', category: 'keyboards', categoryLabel: 'Teclado', price: 158000, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    featured: false, adminOnly: false, tagline: 'Switches silenciosos para trabajo profundo.', dealTag: 'Precio estable',
  },
]

