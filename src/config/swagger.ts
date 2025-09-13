import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// Configuración básica de Swagger
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend Node.js con TypeScript',
      version: '1.0.0',
      description: 'Documentación de la API REST desarrollada con Node.js, Express y TypeScript',
      contact: {
        name: 'Equipo de desarrollo',
        email: 'dev@ejemplo.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://tu-api-produccion.com/api/v1'
          : `http://localhost:${process.env.PORT || 3000}/api/v1`,
        description: process.env.NODE_ENV === 'production'
          ? 'Servidor de producción'
          : 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT en el formato: Bearer <token>',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Token de acceso faltante o inválido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Token no válido',
                  },
                  message: {
                    type: 'string',
                    example: 'Acceso denegado. Token requerido.',
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          description: 'Error de validación en los datos enviados',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Datos inválidos',
                  },
                  details: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['El campo email es requerido', 'La contraseña debe tener al menos 6 caracteres'],
                  },
                },
              },
            },
          },
        },
        ServerError: {
          description: 'Error interno del servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Error interno del servidor',
                  },
                  message: {
                    type: 'string',
                    example: 'Ha ocurrido un error inesperado',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts', // Rutas donde están los comentarios de Swagger
    './src/controllers/*.ts', // Controladores con documentación
    './src/models/*.ts', // Modelos para esquemas
  ],
};

// Generar especificación de Swagger
const specs = swaggerJsdoc(options);

// Configurar Swagger UI
const swaggerUiOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
};

// Función para configurar Swagger en la aplicación
export const setupSwagger = (app: Application): void => {
  // Ruta para la documentación JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // Ruta para la interfaz de Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

  console.log(`📚 Swagger docs available at http://localhost:${process.env.PORT || 3000}/api-docs`);
};

export { specs };