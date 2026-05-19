# TechHub

Aplicacion web full-stack para gestion y compra de perifericos, con frontend en React y backend en Express + Sequelize + MySQL.

## URL de invocacion y usuarios (requisito de documentacion)

### URL del sitio

- Frontend local: `http://localhost:5173`
- Backend local: `http://localhost:4000`

### Usuarios y claves

- `admin | 1234` // usuario administrador (panel privado `/admin`)
- `un_usr | una_clave` // usuario base solicitado para compatibilidad con el docente

## Estado actual del proyecto

- Frontend y backend separados en `FrontEnd/` y `BackEnd/`.
- Autenticacion real contra backend (`/api/auth/login` y `/api/auth/register`).
- Panel de administracion funcional en `/admin`.
- CRUD de productos, usuarios y archivos desde el panel admin.
- Carrito persistente en `localStorage` por tipo de usuario (`admin` y visitante).
- Fallback a datos locales si el backend de productos no esta disponible.

## Requerimientos FASE-II implementados en este aplicativo

### a) Organizacion jerarquica por funcionalidad

Cumplido:

- `FrontEnd/`: interfaz React (componentes, contexto, servicios, estilos).
- `BackEnd/`: API Express (rutas, controladores, modelos, scripts).
- Estructura separada y organizada por capas.

### b) Base de datos MySQL con XAMPP y creacion automatica

Cumplido:

- Motor: MySQL (compatible con XAMPP/phpMyAdmin).
- Creacion automatica de base/tablas via scripts:
  - `npm --prefix BackEnd run db:init`
  - `npm --prefix BackEnd run seed`
- Usuario/clave exigidos por el docente soportados:
  - usuario MySQL: `un_usr`
  - clave: `una_clave`
- Tablas implementadas (minimo 3):
  - `products`
  - `users`
  - `uploads`

### c) Vista para visitantes y vista para usuarios registrados

Cumplido:

- Visitantes: navegacion publica y tienda.
- Usuarios registrados: autenticacion por login/registro con validacion en BD.
- Administrador: acceso a vista privada `/admin` con control por rol.

### 5.a) Mantenimiento de tablas (CRUD: incluir, modificar, cancelar/eliminar, listar)

Cumplido (RESTful):

- Productos:
  - `GET /api/products`
  - `POST /api/products`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`
- Usuarios:
  - `GET /api/users`
  - `GET /api/users/:id`
  - `POST /api/users`
  - `PUT /api/users/:id`
  - `DELETE /api/users/:id`
- Archivos (metadata en tabla `uploads`):
  - `GET /api/uploads`
  - `POST /api/uploads`
  - `PUT /api/uploads/:id`
  - `DELETE /api/uploads/:id`

### 5.b) Uso de Router en backend

Cumplido:

- Enrutamiento modular con `express.Router` en:
  - `authRoutes.js`
  - `usersRoutes.js`
  - `productsRoutes.js`
  - `uploadsRoutes.js`

### 5.d) Login de autenticacion validando existencia en BD

Cumplido:

- `POST /api/auth/login` valida usuario/contrasena contra tabla `users`.
- Registro de usuarios con `POST /api/auth/register`.
- Persistencia de sesion de frontend en `localStorage`.

No implementado (segun nota del enunciado del semestre):

- Recuperacion de contrasena por correo.

### 5.e) Subida y bajada de archivos servidor-cliente

Cumplido:

- Subida con `multer` (`POST /api/uploads`, campo `file`).
- Consulta/listado y descarga via URL publica `/uploads/...`.
- Eliminacion de archivos desde panel admin.
- Soporte para multiples tipos (texto, imagenes, video, audio, etc. segun MIME/archivo).

### 5.f) Servidor de contenidos con `express.static` (imagenes turisticas Bucaramanga)

Cumplido:

- Exposicion publica en backend:
  - `/images` -> `BackEnd/public/images`
- Incluye 3 imagenes turisticas:
  - `bucaramanga-1.svg`
  - `bucaramanga-2.svg`
  - `bucaramanga-3.svg`

### 5.g) Aporte novedoso del equipo

Cumplido:

- Middleware de validacion de correo con expresiones regulares:
  - `BackEnd/src/middlewares/validateEmail.js`
- Aplicado en rutas de creacion/actualizacion de usuarios y registro (`/api/auth/register`).

## Investigacion opcional detectada en el proyecto

Implementado:

- CAPTCHA simulado en login de frontend (`"No soy un robot"`) como barrera basica antes de autenticar.

No evidenciado en el codigo actual:

- JWT.
- Sesiones con expiracion automatica por inactividad.
- Cookies de conteo/recordatorio.
- Generacion de QR.
- WebService/API externa para traductor de moneda (solo formato local COP).

## Funcionalidades reales implementadas

### Frontend

- Navegacion principal con rutas:
1. `/` (Creative Lab / landing)
2. `/tienda` (storefront)
3. `/admin` (dashboard admin, protegido por rol)

- Tienda (`/tienda`):
1. Busqueda de productos en tiempo real.
2. Filtro por categorias.
3. Ordenamiento por destacados, nombre, precio y descuento.
4. Seccion de ofertas.
5. Modal de detalle de producto.
6. Carrito lateral con:
   - suma/resta/eliminacion de items,
   - subtotal,
   - sugerencias por categoria,
   - persistencia en localStorage.

- Autenticacion UI:
1. Inicio de sesion.
2. Registro de usuario.
3. Estado de sesion en navbar.
4. Cierre de sesion.

- Administracion (`/admin`, solo `role=admin`):
Credenciales son Usuario:admin y la password:1234
1. Metricas de productos.
2. CRUD de productos.
3. CRUD de usuarios.
4. Subida y eliminacion de archivos.

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
- `PUT /api/uploads/:id`
- `DELETE /api/uploads/:id`

Ademas expone estaticos:

- `/images`
- `/uploads`

## Credenciales admin por defecto

Al iniciar backend se asegura un usuario admin:

- Usuario: `admin`
- Correo: `admin@gmail.com`
- Contrasena: `1234`
- Rol: `admin`

## Estructura del proyecto

```text
TechHub/
|- FrontEnd/
|  |- src/
|  |  |- components/
|  |  |- context/
|  |  |- data/
|  |  |- services/
|  |  |- styles/
|  |  |- utils/
|  |  |- App.jsx
|  |  `- main.jsx
|  `- package.json
|- BackEnd/
|  |- src/
|  |  |- config/
|  |  |- controllers/
|  |  |- middlewares/
|  |  |- models/
|  |  |- routes/
|  |  |- scripts/
|  |  |- app.js
|  |  `- server.js
|  |- public/
|  `- package.json
`- package.json
```

## Variables de entorno

### Backend (`BackEnd/.env`)

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=un_usr
DB_PASSWORD=una_clave
DB_NAME=techhub_db
```

### Frontend (`FrontEnd/.env`)

```env
VITE_API_URL=http://localhost:4000/api
```

## Instalacion y ejecucion

Desde la raiz del repo:

```bash
npm install
npm run install:all
npm --prefix BackEnd run db:init
npm --prefix BackEnd run seed
npm run dev
```

Esto levanta:

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:5173`

## Scripts disponibles

### Raiz

- `npm run install:all`: instala dependencias de frontend y backend.
- `npm run dev`: ejecuta frontend y backend en paralelo.
- `npm run dev:front`: ejecuta solo frontend.
- `npm run dev:back`: ejecuta solo backend.

### BackEnd

- `npm run dev`: backend con nodemon.
- `npm start`: backend en modo normal.
- `npm run seed`: carga semilla de datos.
- `npm run db:init`: inicializa base de datos, usuario MySQL y tablas.

### FrontEnd

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Notas importantes

- Si falla la conexion al backend de productos, el frontend muestra datos locales temporales y avisa en el panel admin.
- El acceso a `/admin` esta condicionado al rol `admin` obtenido del backend.
- El enrutamiento del frontend es manual en `App.jsx` (no usa React Router).
