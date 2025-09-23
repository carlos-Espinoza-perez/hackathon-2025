import { Request, Response } from 'express';
import { getListUsuarioProgresoTopFiveService, getUsuarioProrgesoService, postRegistroUsuarioProgresoDayService } from '../services/userProgress.service.js';

/**
 * @swagger
 * tags:
 *   name: UsuarioProgreso
 *   description: Gestión del progreso por usuario
 *
 * components:
 *   schemas:
 *     UsuarioProgreso:
 *       type: object
 *       properties:
 *         punto:
 *           type: number
 *           format: float
 *           example: 12.5
 *         racha:
 *           type: number
 *           format: float
 *           example: 3
 *         reto:
 *           type: number
 *           format: float
 *           example: 1
 *     UsuarioProgresoCreate:
 *       type: object
 *       description: Registro diario de progreso de un usuario
 *       properties:
 *         punto:
 *           type: number
 *           format: float
 *           description: Puntos del día
 *         racha:
 *           type: number
 *           format: float
 *           description: Racha del usuario
 *         reto:
 *           type: number
 *           format: float
 *           description: Reto completado
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
 */

/**
 * @swagger
 * /UsuarioProgreso/getUsuarioProrgeso:
 *   get:
 *     summary: Obtener el progreso del usuario
 *     tags: [UsuarioProgreso]
 *     responses:
 *       200:
 *         description: Retorna el progreso del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioProgreso'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export const getUsuarioProrgeso = async (req: Request, res: Response) => {
  try {
    const response = await getUsuarioProrgesoService();
    res.json(response); 
  }
  
  catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /UsuarioProgreso/postRegistroUsuarioProgresoDay:
 *   post:
 *     summary: Registrar progreso diario del usuario
 *     tags: [UsuarioProgreso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioProgresoCreate'
 *     responses:
 *       200:
 *         description: Progreso registrado exitosamente
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export const postRegistroUsuarioProgresoDay = async (req: Request, res: Response) => {
  try {
    const { punto, racha, reto } = req.body;
    const response = await postRegistroUsuarioProgresoDayService(punto, racha, reto);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /UsuarioProgreso/getListUsuarioProgresoTopFive:
 *   get:
 *     summary: Obtener los 5 usuarios con mejor progreso
 *     tags: [UsuarioProgreso]
 *     responses:
 *       200:
 *         description: Lista de los 5 usuarios con mejor progreso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioProgreso'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
export const getListUsuarioProgresoTopFive = async (req: Request, res: Response) => {
  try {
    const response = await getListUsuarioProgresoTopFiveService();
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
