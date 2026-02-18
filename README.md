# Skoolia

Plataforma web que conecta **padres de familia** con **escuelas y cursos extracurriculares**, permitiendo descubrir, comparar y gestionar oferta educativa de forma centralizada.

---

# 🚀 Stack Tecnológico

## 🖥 Frontend (apps/web)

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Fetch API wrapper con manejo automático de refresh token
- Autenticación vía cookies HttpOnly

## ⚙ Backend (apps/api)

- NestJS
- Arquitectura Hexagonal (Ports & Adapters)
- Drizzle ORM
- PostgreSQL
- Cloudinary (actual storage provider)
- Soporte preparado para S3 compatible
- JWT con access token + refresh token (HttpOnly cookies)

---

# 🧠 Arquitectura

El proyecto sigue una **arquitectura hexagonal** en el backend.

```
Controller
   ↓
Use Case (Application Layer)
   ↓
Port (Interface)
   ↓
Adapter (Drizzle / Cloudinary / etc.)
```

Esto permite:

- Cambiar Cloudinary por AWS S3 sin tocar lógica de negocio
- Cambiar base de datos sin romper el dominio
- Testing aislado por capas

---

# 🔐 Autenticación

- Access Token en cookie HttpOnly
- Refresh Token en cookie HttpOnly
- El frontend utiliza `credentials: 'include'`
- Refresh automático en caso de 401

---

# 📦 Módulos Principales

## 👤 Auth
- Registro
- Login
- Refresh
- Logout
- Roles: `public` (padres) y `private` (escuelas)

## 👶 Students
- Creación de perfil
- Intereses (categorías)
- Relación many-to-many con categorías

## 🏫 Schools
- Creación de escuela (solo usuarios private)
- Perfil institucional completo
- Ubicación geográfica
- Información académica
- Métricas (rating, favoritos)
- Asignación de categorías
- Feed con filtros y paginación cursor-based

## 📚 Courses
- CRUD de cursos por escuela
- Validación de ownership
- Estados: draft | published | archived
- Control de fechas
- Capacidad y modalidad

## 🗂 Files (Storage Module)
- Arquitectura desacoplada
- Port `FileStorage`
- Adapter actual: Cloudinary
- Metadata guardada en base de datos
- Preparado para migración futura a S3

---

# 🗄 Base de Datos

- PostgreSQL
- Migraciones con Drizzle
- Relación pivot para:
  - student_interests
  - school_categories

---

# 🧾 Convención de commits

Este repositorio utiliza una **convención de commits obligatoria** para mantener un historial claro, consistente y fácil de automatizar.

❗ **Los commits que no cumplan este formato serán rechazados automáticamente.**

---

## 📌 Formato obligatorio

```
tipo[scope]: descripción
```

---

### 🔹 Tipo (`tipo`) — obligatorio

Debe ser uno de los siguientes valores:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `perf`
- `test`
- `build`
- `ci`
- `chore`
- `revert`

---

### 🔹 Scope (`[scope]`) — obligatorio

Siempre entre corchetes.

Scopes principales:

- `web`
- `api`
- `core`
- `ci`
- `deps`
- `docs`

---

### 🔹 Descripción

- En minúsculas
- Clara y directa
- Máximo 150 caracteres
- Sin punto final

---

## ✅ Ejemplos válidos

```
feat[web]: agregar página de login
fix[web]: corregir redirección después de autenticación
style[web]: ajustar estilos del header
refactor[web]: reorganizar componentes del dashboard

feat[api]: crear endpoint de registro
fix[api]: validar token de autenticación
chore[core]: configurar arquitectura hexagonal
```

---

# 🛠 Desarrollo Local

## Instalar dependencias

```bash
pnpm install
```

## Levantar base de datos (si usas docker)

```bash
docker compose up -d
```

## Ejecutar migraciones

```bash
pnpm db:migrate
```

## Ejecutar backend

```bash
pnpm --filter api start:dev
```

## Ejecutar frontend

```bash
pnpm --filter web dev
```

---

# 🔮 Roadmap Técnico

- Presigned URLs para S3
- Sistema de reviews y ratings
- Sistema de favoritos persistente
- Búsqueda geoespacial
- Upload con progress bar
- Sistema de notificaciones

---

# 📌 Filosofía del Proyecto

Skoolia está construido con enfoque en:

- Escalabilidad
- Desacoplamiento
- Migrabilidad de infraestructura
- Código mantenible
- Arquitectura limpia
- Preparación para SaaS real

---

# 🧑‍💻 Autor

Mateo Hernández  
Isaac Abdiel Noriega

---

# 📜 Licencia

Privado — Uso interno del proyecto Skoolia.