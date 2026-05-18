# TechHub

Aplicación web full-stack para gestión y compra de periféricos, con frontend en React y backend en Express + Sequelize + MySQL.

## Estado actual del proyecto

- Frontend y backend separados en `FrontEnd/` y `BackEnd/`.
- Autenticación real contra backend (`/api/auth/login` y `/api/auth/register`).
- Panel de administración funcional en `/admin`.
- CRUD de productos, usuarios y archivos desde el panel admin.
- Carrito persistente en `localStorage` por tipo de usuario (`admin` y visitante).
- Fallback a datos locales si el backend de productos no está disponible.

## Funcionalidades reales implementadas

### Frontend

- Navegación principal con rutas:
1. `/` (Creative Lab / landing)
2. `/tienda` (storefront)
3. `/admin` (dashboard admin, protegido por rol)

- Tienda (`/tienda`):
1. Búsqueda de productos en tiempo real.
2. Filtro por categorías.
3. Ordenamiento por destacados, nombre, precio y descuento.
4. Sección de ofertas.
5. Modal de detalle de producto.
6. Carrito lateral con:
   - suma/resta/eliminación de items,
   - subtotal,
   - sugerencias por categoría,
   - persistencia en localStorage.

- Autenticación UI:
1. Inicio de sesión.
2. Registro de usuario.
3. Estado de sesión en navbar.
4. Cierre de sesión.

- Administración (`/admin`, solo `role=admin`):
Credenciles son Usuario:admin y la password:1234
1. Métricas de productos.
2. CRUD de productos.
3. CRUD de usuarios.
4. Subida y eliminación de archivos.

### Backend

API REST en `BackEnd/src` con rutas:

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/uploads`
- `POST /api/uploads` (multipart/form-data, campo `file`)
- `DELETE /api/uploads/:id`

Además expone estáticos:

- `/images`
- `/uploads`

## Credenciales admin por defecto

Al iniciar backend se asegura un usuario admin:

- Usuario: `admin`
- Correo: `admin@gmail.com`
- Contraseña: `1234`
- Rol: `admin`

## Estructura del proyecto

```text
TechHub/
├─ FrontEnd/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ data/
│  │  ├─ services/
│  │  ├─ styles/
│  │  ├─ utils/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ BackEnd/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ scripts/
│  │  ├─ app.js
│  │  └─ server.js
│  ├─ public/
│  └─ package.json
└─ package.json
```

## Variables de entorno

### Backend (`BackEnd/.env`)

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_clave
DB_NAME=techhub_db
```

### Frontend (`FrontEnd/.env`)

```env
VITE_API_URL=http://localhost:4000/api
```

## Instalación y ejecución

Desde la raíz del repo:

```bash
npm install
npm run install:all
npm run dev
```

Esto levanta:

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:5173`

## Scripts disponibles

### Raíz

- `npm run install:all`: instala dependencias de frontend y backend.
- `npm run dev`: ejecuta frontend y backend en paralelo.
- `npm run dev:front`: ejecuta solo frontend.
- `npm run dev:back`: ejecuta solo backend.

### BackEnd

- `npm run dev`: backend con nodemon.
- `npm start`: backend en modo normal.
- `npm run seed`: carga semilla de datos.
- `npm run db:init`: inicializa/sincroniza base de datos.

### FrontEnd

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Notas importantes

- Si falla la conexión al backend de productos, el frontend muestra datos locales temporales y avisa en el panel admin.
- El acceso a `/admin` está condicionado al rol `admin` obtenido del backend.
- El enrutamiento del frontend es manual en `App.jsx` (no usa React Router).
