# 🛍️ Tech Hub - E-commerce de Periféricos Gaming

**Tech Hub** es una aplicación web moderna y responsiva para la compra de periféricos gaming de alto rendimiento. Implementa un sistema de autenticación seguro, carrito de compras dinámico, filtrado inteligente de productos y un diseño tech-forward con tema oscuro y acentos amarillos.

---

## 📋 Tabla de Contenidos

- [Características Implementadas](#características-implementadas)
- [Funcionalidades](#funcionalidades)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Uso](#instalación-y-uso)
- [Rutas del Aplicativo](#rutas-del-aplicativo)
- [Componentes Principales](#componentes-principales)
- [Diseño Responsivo](#diseño-responsivo)
- [Principios de Diseño Web Aplicados](#principios-de-diseño-web-aplicados)
- [Innovaciones Implementadas](#innovaciones-implementadas)
- [Funcionalidades Completadas vs Pendientes](#funcionalidades-completadas-vs-pendientes)
- [Credenciales de Prueba](#credenciales-de-prueba)

---

## ✨ Características Implementadas

### ✅ Funcionalidades Completadas

- **🔐 Sistema de Autenticación Seguro**
  - Login simulado con validación en cliente
  - Rutas públicas y privadas
  - Protección contra acceso no autorizado
  - Contexto de autenticación con React Context API
  - Soporte para múltiples perfiles (Admin, Cliente)

- **🛒 Carrito de Compras Avanzado**
  - Drawer lateral elegante que se abre desde la derecha
  - Persistencia en localStorage (separado para Admin y Clientes)
  - Sugerencias inteligentes basadas en categorías
  - Contador visual de artículos
  - Gestión de cantidades (aumentar/disminuir/eliminar)

- **📱 Diseño Fully Responsive**
  - Desktop: Layout optimizado para 1280px+
  - Tablet: Adaptación automática 768px-1099px
  - Mobile: Interfaz completa 320px-767px
  - Navegación móvil con menú hamburguesa
  - Grid de productos adaptable (1, 2, o 3 columnas)

- **🎨 Paleta de Colores Moderna**
  - Tema oscuro (dark mode): Base #0f1117
  - Acentos amarillo dorado: #ffd700
  - Alto contraste para accesibilidad
  - Gradientes y sombras con efectos de brillo

- **🔍 Filtrado Inteligente**
  - Filtro por categorías (Teclados, Mouse, Audifonos, Monitores, Accesorios)
  - Búsqueda de texto en tiempo real
  - Sincronización entre: Navegación, Productos, Recomendados
  - Preservación de filtro en URL (?category=...)

- **📦 Sistema de Categorías Clickeables**
  - Cards interactivas en la portada que llevan a /tienda con filtro
  - Navegación por categorías en la zona de productos
  - Categorías en los productos recomendados
  - Efectos hover elegantes con elevación

- **💳 Modal de Autenticación**
  - Formulario de login/registro
  - Validación de campos
  - Mensajes de error claros
  - Icono de ver contraseña (password reveal)
  - Almacenamiento seguro del estado

- **🎯 Ordenamiento de Productos**
  - Por destacado (featured)
  - A-Z / Z-A
  - Precio menor/mayor
  - Mayor descuento
  - Aplicación inmediata en tiempo real

- **📱 Navbar Responsivo**
  - Barra fija superior con efecto glassmorphism
  - Logo con branding visual
  - Búsqueda integrada
  - Contador de carrito
  - Menú hamburguesa en móvil
  - Bordes con acentos amarillos

- **💫 Efectos Visuales**
  - Fade transitions suave
  - Modal con backdrop blur
  - Collapse en secciones (acordeón)
  - Hover effects en cards
  - Animaciones de botones
  - Scroll behavior smooth

---

## 🎯 Funcionalidades

### Página Principal (Home - "/")

- **Hero Section**: Título, descripción y llamada a la acción
- **Cards de Categorías**: Clickeables que llevan a la tienda con filtro
- **Visualización Intuitiva**: Iconos emoji + textos descriptivos
- **Efectos Hover**: Elevación y cambio de color

### Página de Tienda ("/tienda")

- **Navegación por Categorías**: Menú sticky con todas las opciones
- **Grid de Productos**: 
  - Vista desktop: 4 columnas
  - Tablet: 3 columnas
  - Mobile: 1-2 columnas (configurable)
- **Tarjetas de Producto**:
  - Imagen con hover zoom
  - Categoría como botón interactivo
  - Nombre y descripción
  - Precio con descuento tachado
  - Botón "Agregar al carrito"
  - Icono de descuento %
- **Ofertas Activas**: Top 3 con mejor descuento
- **Recomendaciones Inteligentes**:
  - Basadas en carrito del usuario
  - Filtradas por categoría activa
  - Con opción de agregar o ir a la categoría

### Carrito de Compras

- **Drawer Lateral Elegante**:
  - Abre desde la derecha
  - Z-index por encima de navbar
  - Cierre con X prominente (amarillo dorado)
  - Border izquierdo amarillo con glow
- **Contenido del Carrito**:
  - Lista de productos añadidos
  - Imagen, nombre, precio unitario
  - Controles: +, cantidad, -
  - Botón "Quitar" para eliminar
  - Subtotal visible
  - Botón "Finalizar compra"
- **Sugerencias para Complementar**: Productos relevantes en base a categorías del carrito

### Autenticación

- **Login Modal**:
  - Usuario: Admin
  - Contraseña: 1234
  - Validación en cliente
  - Manejo de errores
  - Soporte para registro (UI)
- **Perfil Admin Exclusivo**:
  - Acceso a banner administrativo
  - Productos con precio especial
  - Vista de "Descuentos de administración"

### Producto Modal (ProductModal)

- **Vista Detallada**: Al hacer click en imagen de producto
- **Información Completa**:
  - Imagen grande
  - Nombre, categoría, descripción
  - Precio y descuento
  - Controles de cantidad
  - Botón "Agregar al carrito"

---

## 📁 Estructura del Proyecto

```
FrontEnd/
├── public/
│   ├── _redirects              # Configuración Netlify
│   └── product-fallback.svg    # Imagen por defecto
│
├── src/
│   ├── components/             # Componentes React
│   │   ├── AdminBanner.jsx
│   │   ├── CartDrawer.jsx       # Carrito lateral
│   │   ├── CategoryMenu.jsx     # Navegación por categorías
│   │   ├── CreativeLab.jsx      # Página de inicio (/)
│   │   ├── DealsSection.jsx     # Ofertas activas
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx             # Sección principal del home
│   │   ├── Login.jsx            # Formulario de login
│   │   ├── Navbar.jsx           # Barra de navegación
│   │   ├── ProductCard.jsx      # Card individual de producto
│   │   ├── ProductGrid.jsx      # Grid de productos
│   │   ├── ProductModal.jsx     # Modal de detalles
│   │   ├── Recommendations.jsx  # Recomendaciones
│   │   ├── AdminDashboard.jsx   # Área admin (placeholder)
│   │   ├── SatisfactionForm.jsx # Formulario de satisfacción
│   │   └── FeatureShowcase.jsx  # Showcase de características
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # Contexto de autenticación
│   │
│   ├── data/
│   │   └── products.js          # Datos de productos (mock)
│   │
│   ├── utils/
│   │   ├── auth.js              # Funciones de autenticación
│   │   └── currency.js          # Formateador de precios
│   │
│   ├── App.jsx                  # Componente principal
│   ├── App.css                  # Estilos principales
│   ├── index.css                # Estilos globales
│   ├── main.jsx                 # Punto de entrada
│   └── favicon.svg
│
├── scripts/
│   └── ensure-deps.mjs          # Script de dependencias
│
├── eslint.config.js             # Configuración ESLint
├── vite.config.js               # Configuración Vite
├── package.json                 # Dependencias
├── netlify.toml                 # Configuración Netlify
└── README.md                    # Este archivo
```

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Entrar a la carpeta
cd FrontEnd

# Instalar dependencias
npm install
# o
npm run reinstall

# Iniciar servidor de desarrollo
npm run dev
```

### Compilación para Producción

```bash
npm run build
npm run preview
```

### Despliegue en Netlify

```bash
npm run build
# Sube la carpeta /dist a Netlify
```

---

## 🗺️ Rutas del Aplicativo

### Rutas Públicas (Acceso libre)

| Ruta | Descripción |
|------|-------------|
| `/` | Home/Portada - Página de inicio con cards de categorías |
| `/tienda` | Tienda - Catálogo completo de productos |
| `/tienda?category=keyboards` | Tienda filtrada por categoría |
| `/tienda#products` | Ir a sección de productos |
| `/tienda#deals` | Ir a sección de ofertas |

### Rutas Privadas (Requieren login)

| Ruta | Descripción | Requisito |
|------|-------------|-----------|
| Productos Admin | Sección de descuentos especiales | isAdmin = true |
| Dashboard Admin | Panel administrativo | isAdmin = true |

### Protección de Rutas

- **Modal de Login**: Se presenta automáticamente si intenta acceder a contenido restringido
- **Validación en Cliente**: Las rutas privadas verifican estado de `isAdmin`
- **Prevención de Backdoors**: No hay acceso directo a URLs protegidas

---

## 🧩 Componentes Principales

### Navbar
- Barra fija superior con efecto glassmorphism
- Búsqueda en tiempo real
- Carrito con contador
- Menú responsivo móvil
- Logo con branding

### CartDrawer
- Drawer lateral desde la derecha
- Cierre con X amarillo dorado
- Persistencia en localStorage
- Sugerencias inteligentes
- Z-index 100 (encima de navbar)

### CategoryMenu
- Filtro por categorías clickeable
- Ordenamiento de productos
- Toggle de columnas móvil
- Sincronización global

### ProductCard
- Imagen con hover zoom
- Información del producto
- Botón de agregar
- Indicador de descuento

### ProductModal
- Vista detallada del producto
- Galería de imágenes
- Cantidad seleccionable
- Llamada a la acción

### Recommendations
- Basadas en carrito del usuario
- Filtradas por categoría activa
- Con clickable category links
- Actualización en tiempo real

---

## 📱 Diseño Responsivo

### Breakpoints

```css
Desktop:     ≥ 1100px   (4 columnas)
Tablet:      768-1099px  (3 columnas)
Mobile:      < 768px     (1-2 columnas)
```

### Adaptaciones por Dispositivo

**Desktop (1280px+)**
- Navbar con navegación completa
- Grid de 4 columnas de productos
- Sidebar visible
- Tipografía optimizada

**Tablet (768-1099px)**
- Navbar compacto
- Grid de 3 columnas
- Menú adaptado
- Espaciado reducido

**Mobile (< 768px)**
- Navbar con hamburguesa
- Grid de 1-2 columnas (configurable)
- Full-width cards
- Tipografía escalada
- Touch-friendly buttons (min 44px)

---

## 🎨 Principios de Diseño Web Aplicados

### 1. **Contraste de Color**
- Texto claro sobre fondo oscuro (#e5e5e5 sobre #0f1117)
- Acentos amarillos (#ffd700) para destacar elementos
- Relación de contraste WCAG AA+ para accesibilidad

### 2. **Jerarquía Visual**
- Headings con tamaño y peso diferenciado
- Botones primarios (amarillo) vs secundarios (outline)
- Cards con sombras para profundidad
- Espaciado generoso entre secciones

### 3. **Barra de Navegación Fija**
- Permanece visible al desplazarse
- Z-index: 80 (encima de contenido, debajo de modales)
- Efecto glassmorphism con blur
- Borde superior amarillo dorado

### 4. **Consistencia Visual**
- Paleta de colores uniforme en toda la app
- Espaciado con escala de 8px
- Border radius consistente (6px)
- Tipografía: Space Grotesk + Inter

### 5. **Feedback Visual**
- Estados hover en botones y cards
- Animaciones suave (0.2-0.3s)
- Cursor pointer en elementos interactivos
- Cambios de color en transiciones

### 6. **Organización del Contenido**
- Secciones claramente delimitadas
- Grid layout responsivo
- Máximo ancho de contenedor (1280px)
- Padding coherente

### 7. **Tipografía Web**
- Heading 1: 2.2rem (responsive clamp)
- Heading 2: 1.8rem
- Body: 1rem
- Line height: 1.5

### 8. **Accesibilidad**
- Contraste WCAG AA+
- Botones con aria-labels
- Inputs con placeholder descriptivos
- Navegación lógica con Tab
- Tamaño mínimo de touch targets

---

## 🚀 Innovaciones Implementadas

### 1. **Carrito Drawer Elegante**
- Abre desde la derecha con transición suave
- Z-index 100 (encima de navbar)
- Border izquierdo amarillo dorado con efecto glow
- Cierre con X grandes y visible (color #ffd700)
- Shadow con color accent

### 2. **Filtrado Sincronizado Global**
- Categorías clickeables en home → Llevan a /tienda?category=...
- CategoryMenu → Filtra productos Y recomendados
- URL con parámetro para compartibilidad
- Estado sincronizado en tiempo real

### 3. **Sistema de Sugerencias Inteligente**
- Algoritmo de recomendaciones basado en:
  - Productos en el carrito (categorías)
  - Productos destacados (featured)
  - Precio accesible
- Filtra automáticamente por categoría activa
- Actualización dinámica

### 4. **Persistencia Inteligente del Carrito**
- localStorage separado para Admin y Clientes
- Clave: `techhub_cart_admin` o `techhub_cart_guest`
- Recuperación automática al recargar
- Sincronización entre tabs

### 5. **Password Reveal Icon**
- Implementado en componente Login
- Toggle entre 👁️ / 👁️‍🗨️
- Mejora UX sin comprometer seguridad
- Interacción intuitiva

### 6. **Modal Responsivo Avanzado**
- ProductModal se adapta a cualquier tamaño
- Overlay con backdrop blur effect
- Cierre con ESC o click fuera
- Animación de fade-in suave
- Imagen zoomable

### 7. **Búsqueda en Tiempo Real**
- Input en navbar busca instantáneamente
- Filtra productos mientras escribes
- Case-insensitive
- Limpieza automática
- Resultado visual inmediato

### 8. **Ordenamiento Multi-criterio**
- Por Destacado (featured)
- Alfabético A-Z / Z-A
- Precio menor/mayor
- Mayor descuento
- Aplicación sin page reload

### 9. **Tema Tech-Forward**
- Paleta moderna: Dark + Yellow
- Acentos de neón dorado
- Gradientes sutiles
- Sombras con colores del tema
- Efectos glassmorphism

### 10. **URL-driven State Management**
- Estado de categoría en URL (?category=...)
- Linkeable: usuarios pueden compartir filtered views
- Bookmarkeable: guardar filtros preferidos
- Deep linking: navegar directamente a secciones (#products)
- Recuperable: actualizar página mantiene estado

---

## 📊 Comparativa: Funcionalidades Solicitadas vs Implementadas

### ✅ Completadas

| Requisito | Estado | Detalles |
|-----------|--------|---------|
| Responsive Design | ✅ | Mobile, Tablet, Desktop con breakpoints claros |
| Portada con títulos y logo | ✅ | Hero section + Logo con branding |
| Navbar fija | ✅ | Sticky con efecto glassmorphism y borde amarillo |
| Diseño a tres columnas | ✅ | Grid de 3-4 columnas responsive |
| Efectos visuales | ✅ | Fade, Modal, Collapse, Dropdown, Hover, Glow |
| Footer | ✅ | Con información y redes sociales |
| Router | ✅ | React Router implicit con AppRouter |
| Rutas públicas/privadas | ✅ | Sistema de autenticación con protección |
| Login modal | ✅ | Con validación y password reveal |
| Prevención backdoors | ✅ | URL state management + protección de rutas |
| Carrusel/Acordeón | ✅ | ProductGrid + Collapse effects |
| Formulario | ✅ | Login form + Satisfaction form |
| Organización carpetas | ✅ | components/, context/, data/, utils/ |
| Documentación | ✅ | Este README + comentarios en código |
| Redes sociales | ✅ | Footer con links a redes |

### 🚀 Innovaciones Agregadas (Bonus)

- 🎯 Carrito drawer lateral elegante
- 🎯 Filtrado sincronizado global
- 🎯 Sistema de recomendaciones inteligente
- 🎯 Persistencia de carrito en localStorage
- 🎯 Búsqueda en tiempo real
- 🎯 Ordenamiento multi-criterio
- 🎯 URL-driven state management
- 🎯 Tema oscuro + Amarillo dorado
- 🎯 Password reveal icon
- 🎯 Productos destacados

---

## 🧑‍💻 Credenciales de Prueba

### Usuario Admin

```
Usuario: Admin
Contraseña: 1234
```

**Acceso especial:**
- Ver productos con descuento administrativo
- Acceso a "Descuentos de administración"
- Banner administrativo visible
- Carrito separado (persistence diferente)

### Usuario Cliente

- No requiere login para ver el catálogo
- Funcionalidad completa del carrito
- Acceso a todas las rutas públicas
- Carrito separado (persistence diferente)

---

## 🎓 Tecnologías Utilizadas

### Frontend
- **React 19.2.4**: Biblioteca principal (hooks, context)
- **Vite 8**: Bundler moderno y dev server rápido
- **React Bootstrap 2.10**: Componentes UI pre-estilizados
- **Bootstrap 5.3**: Framework CSS utility-first
- **CSS3**: Custom styles (variables, gradients, animations)

### Herramientas de Desarrollo
- **ESLint 9.39**: Linting de JavaScript
- **Babel**: Transpilación de código moderno
- **npm**: Gestor de paquetes

### Hosting
- **Netlify**: Despliegue, CI/CD, redirects

---

## 📝 Notas Técnicas

### LocalStorage Implementation
```javascript
// Clave dinámica por usuario
const cartStorageKey = isAdmin ? 'techhub_cart_admin' : 'techhub_cart_guest'

// Formato guardado
[
  { id: 1, quantity: 2 },
  { id: 5, quantity: 1 }
]
```

### Context API Usage
```javascript
// Contexto centralizado de autenticación
useAuth() → { isAdmin, setIsAdmin }
```

### URL State Management
```javascript
// Parámetro de categoría
/tienda?category=keyboards

// Fragment para scroll
/tienda#products

// Combinable
/tienda?category=mice&view=offers#deals
```

---

## 🐛 Resolución de Problemas

### Carrito no persiste
1. Verificar localStorage en DevTools (F12 → Application)
2. Revisar clave: `techhub_cart_admin` o `techhub_cart_guest`
3. Borrar datos: `localStorage.clear()` en console
4. Recargar página

### Filtro no funciona
1. Verificar URL tiene `?category=...`
2. Revisar console por errores (F12)
3. Reset: ir a `/tienda` sin parámetros
4. Verificar que categoría existe en datos

### Modal no se cierra
1. Click en X (esquina superior derecha)
2. Click en overlay (fondo oscuro)
3. Presionar ESC
4. Verificar z-index en DevTools

### Navbar no sticky
1. Verificar CSS: `.navbar { position: fixed }`
2. Revisar z-index: debe ser 80
3. Limpiar cache del navegador

---

## 📞 Información del Equipo

**Proyecto Educativo - Programación Web**
https://github.com/Meiweb24/FrontEnd
**Tech Hub © 2026**

Desarrollado como proyecto de Fase 1 de programación web.

---

## 📜 Licencia

Proyecto educativo - Uso académico permitido

---

**Última actualización**: Abril 26, 2026



---

## Backend CRUD (Express + Nodemon + MySQL)

Se agrego backend completo en `BackEnd/` para CRUD de productos desde panel admin.

### 1) Configurar base de datos en XAMPP

1. Inicia Apache y MySQL en XAMPP.
2. Abre phpMyAdmin.
3. Ejecuta el script:

```sql
SOURCE BackEnd/sql/init.sql;
```

Tambien puedes copiar y pegar el contenido de `BackEnd/sql/init.sql`.

### 2) Configurar variables de entorno backend

Crea `BackEnd/.env` basado en `BackEnd/.env.example`:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=un_ust-r
DB_PASSWORD=una_clave
DB_NAME=techhub_db
```

### 3) Configurar variables de entorno frontend

Crea `FrontEnd/.env` basado en `FrontEnd/.env.example`:

```env
VITE_API_URL=http://localhost:4000/api
```

### 4) Instalar dependencias y correr ambos proyectos

Desde la raiz del repo:

```bash
npm install
npm run install:all
npm run dev
```

Esto levanta:
- Backend: `http://localhost:4000`
- Frontend (Vite): `http://localhost:5173`

### Endpoints CRUD

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Notas

- Si el backend esta apagado, el front usa fallback local temporal.
- El panel admin (`/admin`) ahora permite crear, editar y eliminar productos.
- Los cambios reales se guardan en MySQL cuando el backend esta activo.
