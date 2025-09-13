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
<!-- - Base de datos (especificar según tu proyecto: PostgreSQL, MongoDB, etc.) -->

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
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   # Puerto de la aplicación
   PORT=3000
   
   # Entorno
   NODE_ENV=DEV
   ```

<!-- 4. **Configurar base de datos** *(si aplica)*
   ```bash
   # Ejecutar migraciones
   npm run db:migrate
   
   # Ejecutar seeders (datos de prueba)
   npm run db:seed
   ``` -->

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# # Compilar TypeScript a JavaScript
# npm run build

# # Ejecutar en producción
# npm start

# # Ejecutar pruebas
# npm test

# # Ejecutar pruebas en modo watch
# npm run test:watch

# # Linting y formateo
# npm run lint
# npm run format

# # Verificar tipos de TypeScript
# npm run type-check
```

## 🚀 Ejecución Local

### Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

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

## 📡 API Endpoints

Una vez ejecutando la aplicación, podrás acceder a:

- **Health Check**: `GET /health`
- **API Documentation**: `GET /api-docs` 
- **Base URL**: `http://localhost:3000/api`

<!-- ## 🧪 Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas específicas
npm test -- --grep "nombre-del-test"
``` -->

## 📚 Tecnologías Utilizadas

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework**: Express.js
<!-- - **Base de datos**: [Especificar: PostgreSQL/MongoDB/etc.]
- **ORM/ODM**: [Especificar: Prisma/Mongoose/Sequelize/etc.]
- **Testing**: Jest
- **Validación**: [Especificar: Joi/Zod/express-validator/etc.]
- **Autenticación**: JWT -->

## 🔒 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de desarollo | `DEV` |

---

