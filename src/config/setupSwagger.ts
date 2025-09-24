import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Request, Response } from 'express';

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
          ? `${process.env.BASE_URL || 'https://tu-api-produccion.com'}/api`
          : `http://localhost:${process.env.PORT || 3000}/api`,
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
    },
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/models/*.ts',
  ],
};

// Generar especificación de Swagger
const specs = swaggerJsdoc(options);

// Opciones de Swagger UI
const swaggerUiOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
};

// Configuración de Swagger en la app
export const setupSwagger = (app: Application): void => {
  // JSON de la especificación
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // UI de Swagger
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, swaggerUiOptions)
  );

  const url =
    process.env.NODE_ENV === 'production'
      ? `${process.env.BASE_URL || 'https://tu-api-produccion.com'}/api-docs`
      : `http://localhost:${process.env.PORT || 3000}/api-docs`;

  console.log(`📚 Swagger docs available at: ${url}`);
};

export { specs };
