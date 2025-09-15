import { Request, Response, NextFunction } from 'express';
import { getUserByToken } from '../services/user.services.js';

export interface AuthRequest extends Request {
  user?: any; // puedes tipar según tu modelo de usuario
}

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    // Agregamos el usuario al request para usarlo en los controllers
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ error: 'Acceso denegado', message: err.message });
  }
};
