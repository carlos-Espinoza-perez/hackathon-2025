import { Request, Response } from 'express';
import {
  getAcademyByAcademiaIdServices,
  getCursoByCursoIdServices,
  getListAcademyServices,
  getListCursoByAcademiaIdServices,
  getListCursosVistosRecientesServices,
  getListLastCursosServices,
  getListSesionCursoByCursoIdServices,
  getProgresoByAcademiaIdServices,
  getProgresoByCursoIdServices,
  postSaveProgresoBySesionCursoIdServices
} from '../services/academy.services.js';
import { createCertificate } from '../services/certificate.services.js';

/**
 * @swagger
 * tags:
 *   name: Academia
 *   description: Gestión de Academias, Cursos, Sesiones y Progresos de los usuarios
 *
 * components:
 *   schemas:
 *     UsuarioProgreso:
 *       type: object
 *       properties:
 *         UsuarioId:
 *           type: string
 *         CursoId:
 *           type: string
 *         Avance:
 *           type: number
 *         Fecha:
 *           type: string
 *           format: date-time
 *     Curso:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *         Nombre:
 *           type: string
 *         Descripcion:
 *           type: string
 *         AcademiaId:
 *           type: string
 *     Academia:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *         Nombre:
 *           type: string
 *         Descripcion:
 *           type: string
 *
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
 * /Academia/getListCursosVistosRecientes:
 *   get:
 *     summary: Lista de cursos vistos recientemente por el usuario
 *     tags: [Academia]
 *     responses:
 *       200:
 *         description: Lista de cursos vistos recientemente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioProgreso'
 */
export const getListCursosVistosRecientes = async (req: Request, res: Response) => {
  try {
    const response = await getListCursosVistosRecientesServices();
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getListAcademy:
 *   get:
 *     summary: Obtener lista de academias
 *     tags: [Academia]
 *     responses:
 *       200:
 *         description: Lista de academias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Academia'
 */
export const getListAcademy = async (req: Request, res: Response) => {
  try {
    const response = await getListAcademyServices();
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getListLastCursos:
 *   get:
 *     summary: Obtener lista de últimos cursos agregados
 *     tags: [Academia]
 *     responses:
 *       200:
 *         description: Lista de últimos cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
export const getListLastCursos = async (req: Request, res: Response) => {
  try {
    const response = await getListLastCursosServices();
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getAcademyByAcademiaId/{academiaId}:
 *   get:
 *     summary: Obtener información de una academia por ID
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: academiaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la academia
 *     responses:
 *       200:
 *         description: Información de la academia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Academia'
 */
export const getAcademyByAcademiaId = async (req: Request, res: Response) => {
  try {
    const { academiaId } = req.params;
    const response = await getAcademyByAcademiaIdServices(academiaId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getListCursoByAcademiaId/{academiaId}:
 *   get:
 *     summary: Obtener cursos de una academia específica
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: academiaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la academia
 *     responses:
 *       200:
 *         description: Lista de cursos de la academia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
export const getListCursoByAcademiaId = async (req: Request, res: Response) => {
  try {
    const { academiaId } = req.params;
    const response = await getListCursoByAcademiaIdServices(academiaId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getProgresoByAcademiaId/{academiaId}:
 *   get:
 *     summary: Obtener progreso de usuario por academia
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: academiaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la academia
 *     responses:
 *       200:
 *         description: Progreso del usuario en la academia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioProgreso'
 */
export const getProgresoByAcademiaId = async (req: Request, res: Response) => {
  try {
    const { academiaId } = req.params;
    const response = await getProgresoByAcademiaIdServices(academiaId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getCursoByCursoId/{cursoId}:
 *   get:
 *     summary: Obtener información de un curso por su ID
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Información del curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 */
export const getCursoByCursoId = async (req: Request, res: Response) => {
  try {
    const { cursoId } = req.params;
    const response = await getCursoByCursoIdServices(cursoId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getListSesionCursoByCursoId/{cursoId}:
 *   get:
 *     summary: Obtener la lista de sesiones de un curso por su ID
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de sesiones del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
export const getListSesionCursoByCursoId = async (req: Request, res: Response) => {
  try {
    const { cursoId } = req.params;
    const response = await getListSesionCursoByCursoIdServices(cursoId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /Academia/getProgresoByCursoId/{cursoId}:
 *   get:
 *     summary: Obtener progreso del usuario en un curso específico
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Progreso del usuario en el curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioProgreso'
 */
export const getProgresoByCursoId = async (req: Request, res: Response) => {
  try {
    const { cursoId } = req.params;
    const response = await getProgresoByCursoIdServices(cursoId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};



/**
 * @swagger
 * /Academia/postSaveProgresoBySesionCursoId/{sesionCursoId}/{avance}:
 *   post:
 *     summary: Guardar progreso del usuario en una sesión de curso
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: sesionCursoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la sesión del curso
 *       - in: path
 *         name: avance
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: Avance del usuario en la sesión (ej. porcentaje)
 *     responses:
 *       200:
 *         description: Progreso guardado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioProgreso'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El parámetro avance es inválido"
 */
export const postSaveProgresoBySesionCursoId = async (req: Request, res: Response) => {
  try {
    const { sesionCursoId, avance } = req.params;
    const response = await postSaveProgresoBySesionCursoIdServices(sesionCursoId, parseFloat(avance));
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


/**
 * @swagger
 * /Academia/generateCertificate/{cursoId}:
 *   post:
 *     summary: Generar certificado de un curso
 *     tags: [Academia]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso para generar el certificado
 *     responses:
 *       200:
 *         description: Certificado generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Certificado generado para el curso ID: abc123"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se pudo generar el certificado"
 */
export const generateCertificateServices = async (req: Request, res: Response) => {
  try {
    const {cursoId } = req.params;
    const response = await createCertificate(cursoId);
  
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};