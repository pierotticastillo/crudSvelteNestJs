# 🛒 Product Manager App

Una aplicación web simple para gestionar productos, desarrollada con **Svelte**, **TypeScript** y **Bootstrap 5**, conectada a un backend real. Permite realizar operaciones **CRUD** (crear, leer, actualizar y eliminar) sobre una lista de productos.

## ✨ Tecnologías utilizadas

- [Svelte](https://svelte.dev/) – Framework frontend reactivo
- [TypeScript](https://www.typescriptlang.org/) – Tipado estático
- [Bootstrap 5](https://getbootstrap.com/) – Estilos y diseño responsivo
- [SweetAlert2](https://sweetalert2.github.io/) – Alertas personalizadas
- [Noty](https://ned.im/noty/) – Notificaciones tipo toast (opcional)
- Backend: Conectado a una API REST construida con [NestJS](https://nestjs.com/) y [PostgreSQL](https://www.postgresql.org/) (no incluido en este repo)

## ⚙️ Funcionalidades

- ✅ Listado de productos
- ➕ Agregar un nuevo producto
- 📝 Editar productos existentes
- ❌ Eliminar productos con confirmación
- 🔄 Formulario dinámico: cambia entre "Agregar" y "Actualizar" según el estado
- 🔔 Alertas visuales con SweetAlert2

## 🧩 Estructura del proyecto

```
src/
├── Services/
│   └── Product.service.ts # Funciones para comunicarse con el backend
├── types/
│   └── Product.interface.ts # Definición de la interfaz Product
├── App.svelte # Componente principal
├── main.ts # Punto de entrada
```
## 🚀 Cómo ejecutar el proyecto

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/pierotticastillo/crudSvelteNestJs.git
   cd crudSvelteNestJs
   ```

### Frontend

1. Navegá a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instalá las dependencias:

   ```bash
   pnpm install
   ```

3. Ejecutá el proyecto en modo desarrollo:

   ```bash
   pnpm dev
   ```

4. Asegurate de tener el backend corriendo en la URL esperada (por ejemplo `http://localhost:3000/api/products`).

### Backend

1. Desde la raíz del repositorio, navegá a la carpeta del backend:

   ```bash
   cd ../backend
   ```

2. Instalá las dependencias:

   ```bash
   pnpm install
   ```

3. Configurá las variables de entorno en un archivo `.env`:

   ```env
   # PostgreSQL config
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=tuUsername
   DATABASE_PASSWORD=tuPassword
   DATABASE_NAME=tuBaseDeDatos
   # App config
   PORT_SERVER=3000
   # CORS config
   CORS_ORIGIN=http://localhost:5173
   CORS_METHODS=GET,POST,PATCH,DELETE
   CORS_ALLOWED_HEADERS=Content-Type,Authorization
   ```

4. Ejecutá el backend:

   ```bash
   pnpm start:dev
   ```

5. Verificá que el backend está corriendo en `http://localhost:3000/api/products`.
## 🖼️ Captura de pantalla

![Add books View](/screenshots/addProducts.png)

---

![Update books View](/screenshots/updateProducts.png)

---


## 🚀 Cómo ejecutar el proyecto

### Frontend

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/pierotticastillo/crudSvelteNestJs.git
   cd crudSvelteNestJs
   ```

2. Instalá las dependencias:

   ```bash
   pnpm install
   ```

3. Ejecutá el proyecto en desarrollo:

   ```bash
   pnpm dev
   ```

4. Asegurate de tener el backend corriendo en la URL esperada (por ejemplo `http://localhost:3000/api/products`).

### Backend

1. Cloná el repositorio del backend (si está en un repo separado):

   ```bash
   git clone https://github.com/pierotticastillo/crudSvelteNestJs.git
   cd crudSvelteNestJs
   ```

2. Instalá las dependencias:

   ```bash
   pnpm install
   ```

3. Configurá las variables de entorno en un archivo `.env`:

   ```env
   # PostgreSQL config
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=tuUsername
   DATABASE_PASSWORD=tuPassword
   DATABASE_NAME=tuBaseDeDatos
   # App config
   PORT_SERVER=3000
   # CORS config
   CORS_ORIGIN=http://localhost:5173
   CORS_METHODS=GET,POST,PATCH,DELETE
   CORS_ALLOWED_HEADERS=Content-Type,Authorization
   ```

4. Ejecutá el backend:

   ```bash
   pnpm start:dev
   ```

## 🗃️ Modelo de datos

Cada producto tiene la siguiente estructura:

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageURL: string;
}
```

## 📌 Notas

- El formulario se limpia automáticamente luego de guardar un producto.
- Cuando se está en modo edición, el formulario cambia dinámicamente y ofrece la opción de cancelar.
- Las operaciones muestran mensajes visuales según el resultado (éxito o error).

## 📄 Licencia

Este proyecto está bajo la licencia MIT.