import { Request, Response } from 'express';
import { deleteUserByEmail, getUserByToken, signIn, signUp } from '../services/user.services.js';

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operaciones de autenticación y gestión de usuarios
 *
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       required:
 *         - correo
 *         - contrasena
 *         - nombre
 *       properties:
 *         correo:
 *           type: string
 *           example: usuario@ejemplo.com
 *         contrasena:
 *           type: string
 *           example: password123
 *         nombre:
 *           type: string
 *           example: "Carlos Espinoza"
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@ejemplo.com
 *         password:
 *           type: string
 *           example: password123
 *     DeleteUser:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@ejemplo.com
 *   responses:
 *     ValidationError:
 *       description: Error de validación de datos
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Datos inválidos"
 *     ServerError:
 *       description: Error interno del servidor
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Error del servidor"
 *     UnauthorizedError:
 *       description: No autorizado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Token inválido"
 */

/**
 * @swagger
 * /usuario/create:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export async function register(req: Request, res: Response) {
  try {
    const user = await signUp(req.body.nombre, req.body.correo, req.body.contrasena);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * @swagger
 * /Usuario/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Sesión iniciada, retorna token de acceso
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export async function login(req: Request, res: Response) {
  try {
    console.log({ req, res })
    const session = await signIn(req.body.email, req.body.password);
    res.json(session);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * @swagger
 * /usuario/delete:
 *   post:
 *     summary: Eliminar un usuario por correo (solo admin)
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUser'
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export async function deleteUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Correo requerido' });

    const result = await deleteUserByEmail(email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * @swagger
 * /usuario/profile:
 *   get:
 *     summary: Obtener información del usuario actual
 *     tags: [Usuario]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT enviado desde el frontend
 *     responses:
 *       200:
 *         description: Retorna la información del usuario
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export async function profile(req: Request, res: Response) {
  try {
    const token = req.query.token as string;
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    const user = await getUserByToken(token);
    if (!user) return res.status(401).json({ error: 'Token no válido' });

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}





