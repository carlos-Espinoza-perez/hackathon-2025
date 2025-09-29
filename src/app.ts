import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { setupSwagger } from './config/swagger.js';

import routes from "./routes/index.js";
const app: Application = express();

// Middlewares globales
app.use(helmet()); // Seguridad HTTP headers
app.use(cors());

app.use(morgan('combined')); // Logging de requests
app.use(express.json({ limit: '10mb' })); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL encoded

// Configurar Swagger (solo en desarrollo y testing)
if (process.env.NODE_ENV !== 'production') {
  setupSwagger(app);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Rutas principales
app.use("/api", routes);


// Middleware global de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);

  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.originalUrl} no existe`,
  });

  res.status(err.status || 500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production'
      ? 'Ha ocurrido un error inesperado'
      : err.message,
  });
});

export default app;