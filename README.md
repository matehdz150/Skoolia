# Skoolia

## 🧾 Convención de commits

Este repositorio utiliza una **convención de commits obligatoria** para mantener un historial claro, consistente y fácil de automatizar.

❗ **Los commits que no cumplan este formato serán rechazados automáticamente.**

---

### 📌 Formato obligatorio

---

### 🔹 Tipo (`tipo`) — obligatorio

Debe ser **uno de los siguientes valores**:

- `feat` → nueva funcionalidad
- `fix` → corrección de un bug
- `docs` → cambios en documentación
- `style` → cambios de formato o estilos (sin lógica)
- `refactor` → refactorización de código
- `perf` → mejoras de rendimiento
- `test` → tests nuevos o actualizados
- `build` → cambios en build o dependencias
- `ci` → cambios en CI/CD
- `chore` → tareas generales (configuración, tooling)
- `revert` → revertir un commit anterior

---

### 🔹 Scope (`[scope]`) — obligatorio

Indica **qué parte del proyecto se ve afectada**.  
Debe ir **siempre entre corchetes** `[]`.

Scopes comunes en este repositorio:

- `web` → frontend (Next.js)
- `api` → backend (NestJS)
- `core` → configuración general
- `ci` → pipelines y automatización
- `deps` → dependencias
- `docs` → documentación

---

### 🔹 Descripción

- Escrita en **minúsculas**
- Clara y directa
- Máximo **150 caracteres**
- **No** terminar con punto (`.`)

---

## ✅ Ejemplos válidos

```bash
feat[web]: agregar página de login

ejemplos validos:
feat[web]: agregar página de login
fix[web]: corregir redirección después de autenticación
style[web]: ajustar estilos del header
refactor[web]: reorganizar componentes del dashboard

feat[api]: crear endpoint de registro de usuarios
fix[api]: validar token de autenticación