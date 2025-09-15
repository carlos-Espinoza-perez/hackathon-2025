import { Request, Response } from 'express';
import { deleteUserByEmail, getUserByToken, signIn, signUp } from '../services/user.services.js';

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operaciones de autenticación de usuarios
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasena
 *               - nombre
 *             properties:
 *               correo:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *               contrasena:
 *                 type: string
 *                 example: password123
 *               nombre:
 *                 type: string 
 *                 example: "Carlos Espinoza"
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
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 example: password123
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
    const session = await signIn(req.body.email, req.body.password);
    res.json(session);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * @swagger
 * /users/delete:
 *   post:
 *     summary: Eliminar un usuario por correo (solo admin)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
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
 * /users/profile:
 *   get:
 *     summary: Obtener información del usuario actual
 *     tags: [User]
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
 *         description: Token inválido o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Token requerido o no válido'
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



