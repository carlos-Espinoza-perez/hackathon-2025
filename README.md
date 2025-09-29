# Proyecto Backend Node.js con TypeScript

## 📋 Descripción

Backend desarrollado con Node.js y TypeScript siguiendo una arquitectura por capas, proporcionando una API RESTful escalable y mantenible.

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura por capas** que separa las responsabilidades del código:

```
📦 Proyecto Backend
├── 📁 src/                    # Código fuente principal
│   ├── 📁 config/            # Configuraciones de la aplicación
│   ├── 📁 controllers/       # Controladores - Lógica de presentación
│   ├── 📁 middlewares/       # Middlewares personalizados
│   ├── 📁 models/           # Modelos de datos y esquemas
│   ├── 📁 routes/           # Definición de rutas de la API
│   ├── 📁 services/         # Lógica de negocio
│   ├── 📁 utils/            # Utilidades y funciones auxiliares
│   └── 📄 app.ts            # Configuración principal de Express
├── 📁 test/                  # Pruebas unitarias e integración
├── 📄 server.ts             # Punto de entrada de la aplicación
├── 📄 package.json          # Dependencias y scripts
├── 📄 tsconfig.json         # Configuración de TypeScript
└── 📄 .env                  # Variables de entorno
```

### Descripción de capas:

- **Routes**: Define los endpoints y asocia cada ruta con su controlador correspondiente
- **Controllers**: Maneja las peticiones HTTP, valida datos y retorna respuestas
- **Services**: Contiene la lógica de negocio y reglas de la aplicación
- **Models**: Define la estructura de datos y esquemas de base de datos
- **Middlewares**: Funciones que se ejecutan antes de llegar a los controladores
- **Utils**: Funciones auxiliares reutilizables en toda la aplicación
- **Config**: Configuraciones de base de datos, servicios externos, etc.

## 🚀 Instalación y Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Base de datos (PostgreSQL)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/carlos-Espinoza-perez/hackathon-2025.git
   cd hackathon-2025
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o con yarn
   yarn install
   ```

3. **Configurar variables de entorno**


   | Variable | Descripción |
   |---------|-------------|
   | `PORT` | Puerto en el que se ejecutará el servidor de la aplicación. Ejemplo: `3001`. |
   | `NODE_ENV` | Entorno de ejecución de la app. Puede ser `DEV`, `PROD` o `TEST`. |
   | `PASSWORD` | Contraseña utilizada para autenticación interna (por ejemplo, acceso a la base de datos o SSH). |
   | `DATABASE_URL` | URL de conexión a la base de datos PostgreSQL (usa conexión con *connection pooling*). Debe incluir usuario, contraseña, host, puerto, base de datos y `sslmode=require`. |
   | `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase con permisos elevados para operaciones del backend. **No exponer en el frontend.** |
   | `SUPABASE_URL` | URL del proyecto de Supabase. |
   | `OPENAI_API_KEY` | API Key de OpenAI para consumir modelos de IA. |
   | `OPENAI_ASSISTANT_ID` | ID del asistente configurado en OpenAI (si se usa un Assistant API). |
   | `SSH_IP_EXTERNAL` | Dirección IP pública del servidor remoto al que se conecta por SSH. |
   | `SSH_USER` | Usuario SSH para conectarse al servidor. |
   | `GITHUB_TOKEN` | Token personal de GitHub (PAT) usado para autenticación en repositorios privados. |

   ### Ejemplo de archivo `.env`

   ```env
   PORT=3001
   NODE_ENV=DEV
   PASSWORD=********
   DATABASE_URL=postgresql://usuario:contraseña@host:5432/base?sslmode=require
   SUPABASE_SERVICE_ROLE_KEY=********
   SUPABASE_URL=https://tu-proyecto.supabase.co
   OPENAI_API_KEY=********
   OPENAI_ASSISTANT_ID=********
   SSH_IP_EXTERNAL=0.0.0.0
   SSH_USER=usuario
   GITHUB_TOKEN=********
   ```

4. **Configurar base de datos**
   ```bash
   # Ejecutar migraciones
   npx prisma db push
   ```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# Compilar TypeScript a JavaScript
npm run build
```

## 🚀 Ejecución Local

### Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`
La documentación Swagger estará disponible en: `http://localhost:3000/api-docs`

### Modo Producción
```bash
npm run build
npm start
```

## 🔧 Configuración de TypeScript

El proyecto utiliza las siguientes configuraciones principales:

- **Módulos ES6**: Soporte completo para import/export
- **Target ES2022**: Características modernas de JavaScript
- **Strict Mode**: Habilitado para mayor seguridad de tipos

## Endpoints de la API

La API está disponible en:  
**Servidor de desarrollo:** `http://localhost:3000/api`

### 🔑 Autenticación
La API usa autenticación mediante **Bearer Token (JWT)**.  
Agrega en el header de cada request:

```
http
Authorization: Bearer <token>
```

---

### 📚 Endpoints de Academia

| Método | Endpoint                                                             | Descripción                                             | Parámetros                       |
| ------ | -------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------- |
| GET    | `/Academia/getListCursosVistosRecientes`                             | Lista de cursos vistos recientemente por el usuario     | -                                |
| GET    | `/Academia/getListAcademy`                                           | Obtiene la lista de academias disponibles               | -                                |
| GET    | `/Academia/getListLastCursos`                                        | Obtiene la lista de los últimos cursos agregados        | -                                |
| GET    | `/Academia/getAcademyByAcademiaId/{academiaId}`                      | Obtiene información de una academia por su ID           | `academiaId` (path)              |
| GET    | `/Academia/getListCursoByAcademiaId/{academiaId}`                    | Obtiene los cursos de una academia específica           | `academiaId` (path)              |
| GET    | `/Academia/getProgresoByAcademiaId/{academiaId}`                     | Obtiene el progreso del usuario en una academia         | `academiaId` (path)              |
| GET    | `/Academia/getCursoByCursoId/{cursoId}`                              | Obtiene información de un curso por su ID               | `cursoId` (path)                 |
| GET    | `/Academia/getListSesionCursoByCursoId/{cursoId}`                    | Lista de sesiones de un curso                           | `cursoId` (path)                 |
| GET    | `/Academia/getProgresoByCursoId/{cursoId}`                           | Obtiene el progreso del usuario en un curso específico  | `cursoId` (path)                 |
| POST   | `/Academia/postSaveProgresoBySesionCursoId/{sesionCursoId}/{avance}` | Guarda el progreso de un usuario en una sesión de curso | `sesionCursoId`, `avance` (path) |
| POST   | `/Academia/generateCertificate/{cursoId}`                            | Genera un certificado para el curso especificado        | `cursoId` (path)                 |

---

### 🤖 Endpoints del Asistente de IA

| Método | Endpoint                                     | Descripción                                                       | Body                                                                |
| ------ | -------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| POST   | `/Asistente/MessageGeneral`                  | Envía un mensaje al asistente de IA general (usa SSE)             | `{ "threadId": "abc123", "message": "Texto del usuario" }`          |
| POST   | `/Asistente/MessageAcademia`                 | Envía un mensaje al asistente usando el contexto de una academia  | `{ "threadId": "abc123", "academiaId": "xyz", "message": "Texto" }` |
| POST   | `/Asistente/MessageCurso`                    | Envía un mensaje al asistente usando el contexto de un curso      | `{ "threadId": "abc123", "cursoId": "xyz", "message": "Texto" }`    |
| POST   | `/Asistente/MessageSesion`                   | Genera contenido usando el contexto de una sesión                 | `{ "threadId": "abc123", "sesionId": "xyz", "message": "Texto" }`   |
| POST   | `/Asistente/GenerateContentSesionBySesionId` | Genera el contenido de una sesión por ID (sin prompt del usuario) | `{ "threadId": "abc123", "sesionId": "xyz" }`                       |

---

### 👤 Endpoints de Usuario

| Método | Endpoint           | Descripción                                    | Body                                                                  |
| ------ | ------------------ | ---------------------------------------------- | --------------------------------------------------------------------- |
| POST   | `/usuario/create`  | Registra un nuevo usuario                      | `{ "correo": "email", "contrasena": "password", "nombre": "Nombre" }` |
| POST   | `/usuario/login`   | Inicia sesión y retorna token JWT              | `{ "email": "email", "password": "password" }`                        |
| POST   | `/usuario/delete`  | Elimina un usuario por correo (requiere admin) | `{ "email": "email" }`                                                |
| GET    | `/usuario/profile` | Obtiene la información del usuario actual      | `token` (query)                                                       |

---

### 📈 Endpoints de UsuarioProgreso

| Método | Endpoint                                          | Descripción                                     | Body                                     |
| ------ | ------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- |
| GET    | `/UsuarioProgreso/getUsuarioProrgeso`             | Obtiene el progreso del usuario actual          | -                                        |
| POST   | `/UsuarioProgreso/postRegistroUsuarioProgresoDay` | Registra el progreso diario del usuario         | `{ "punto": 10, "racha": 3, "reto": 1 }` |
| GET    | `/UsuarioProgreso/getListUsuarioProgresoTopFive`  | Obtiene el top 5 de usuarios con mejor progreso | -                                        |

---

### 🖥️ Endpoint de Consola / SSH

   | Método | Endpoint               | Descripción                                | Body                      |
   | ------ | ---------------------- | ------------------------------------------ | ------------------------- |
   | POST   | `/Consola/ExecCommand` | Ejecuta un comando remoto en la VM vía SSH | `{ "command": "uptime" }` |

---

> **Nota:** Para respuestas de error, la API puede retornar:
>
> * **400:** Error de validación (`{ "error": "Mensaje" }`)
> * **401:** No autorizado (`{ "error": "Token inválido" }`)
> * **500:** Error interno del servidor



## 📚 Tecnologías Utilizadas

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework**: Express.js
- **Base de datos**: PostgreSQL
- **ORM/ODM**: Prisma
- **Validación**: express-validator
- **Autenticación**: JWT
<!-- - **Testing**: Jest -->