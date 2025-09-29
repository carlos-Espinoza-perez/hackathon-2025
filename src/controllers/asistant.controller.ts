import { Request, Response } from 'express';
import { AssistantService } from '../services/assistant.services.js';
import supabase from '../config/supabaseClient.js';

const apiKey = process.env.OPENAI_API_KEY!;
const assistantId = process.env.OPENAI_ASSISTANT_ID!;

/**
 * @swagger
 * tags:
 *   name: Assistant
 *   description: Endpoints para interactuar con el asistente de IA
 */

/**
 * @swagger
 * /Asistente/MessageGeneral:
 *   post:
 *     summary: Envía un mensaje al asistente de IA (general) usando SSE
 *     tags: [Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *                 description: ID del hilo (opcional)
 *                 example: "abc123"
 *               message:
 *                 type: string
 *                 description: Mensaje del usuario
 *                 example: "Hola, ¿qué es la mecatrónica?"
 *     responses:
 *       200:
 *         description: Stream de tokens SSE
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: |
 *                 data: {"token":"Hola, "}
 *                 data: {"token":"la mecatrónica "}
 *                 data: {"token":"es la combinación..."}
 *                 data: {"done":true,"threadId":"abc123"}
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */
export const messageIAGeneral = async (req: Request, res: Response) => {
  const { threadId, message } = req.body;
  if (!message) return res.status(400).json({ error: "El mensaje es obligatorio" });

  const assistantService = new AssistantService(apiKey, assistantId);

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendToken = (token: string) => res.write(`data: ${JSON.stringify({ token })}\n\n`);

  try {
    const { threadId: newThreadId } = await assistantService.streamResponse(threadId || null, message, sendToken);
    res.write(`data: ${JSON.stringify({ done: true, threadId: newThreadId })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`);
    res.end();
  }
};

/**
 * @swagger
 * /Asistente/MessageAcademia:
 *   post:
 *     summary: Envía un mensaje al asistente usando la instrucción de una academia
 *     tags: [Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *               academiaId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stream SSE
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */
export const messageIAAcademia = async (req: Request, res: Response) => {
  const { threadId, academiaId, message } = req.body;
  if (!message) return res.status(400).json({ error: "El mensaje es obligatorio" });
  if (!academiaId) return res.status(400).json({ error: "El ID de la academia es obligatorio" });


  const instruccionAcademia = await supabase
    .from('Academia')
    .select('Descripcion')
    .eq('Id', academiaId)
    .single();

  if (instruccionAcademia.error || !instruccionAcademia.data)
    return res.status(400).json({ error: "No se encontró la academia" });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendToken = (token: string) => res.write(`data: ${JSON.stringify({ token })}\n\n`);

  try {
    const assistantService = new AssistantService(apiKey, assistantId, instruccionAcademia.data.Descripcion);
    const { threadId: newThreadId } = await assistantService.streamResponse(threadId || null, message, sendToken);
    res.write(`data: ${JSON.stringify({ done: true, threadId: newThreadId })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`);
    res.end();
  }
};

/**
 * @swagger
 * /Asistente/MessageCurso:
 *   post:
 *     summary: Envía un mensaje al asistente usando la instrucción de un curso y su academia
 *     tags: [Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *               cursoId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stream SSE
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */
export const messageIACurso = async (req: Request, res: Response) => {
  const { threadId, cursoId, message } = req.body;
  if (!message) return res.status(400).json({ error: "El mensaje es obligatorio" });
  if (!cursoId) return res.status(400).json({ error: "El ID del curso es obligatorio" });

  const instruccionCurso = await supabase
    .from('Curso')
    .select(`
      Instruccional,
      Academia (
        Descripcion
      )
    `)
    .eq('Id', cursoId)
    .single() as any;

  if (instruccionCurso.error || !instruccionCurso.data)
    return res.status(400).json({ error: "No se encontró el curso" });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendToken = (token: string) => res.write(`data: ${JSON.stringify({ token })}\n\n`);

  try {
    const assistantService = new AssistantService(
      apiKey,
      assistantId,
      instruccionCurso.data.Academia.Descripcion,
      instruccionCurso.data.Instruccional
    );
    const { threadId: newThreadId } = await assistantService.streamResponse(threadId || null, message, sendToken);
    res.write(`data: ${JSON.stringify({ done: true, threadId: newThreadId })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`);
    res.end();
  }
};

/**
 * @swagger
 * /Asistente/MessageSesion:
 *   post:
 *     summary: Genera el contenido de una sesión usando la instrucción de la sesión, su curso y academia
 *     tags: [Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *               sesionId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stream SSE
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */
export const messageIASesion = async (req: Request, res: Response) => {
  const { threadId, sesionId, message } = req.body;
  if (!message) return res.status(400).json({ error: "El mensaje es obligatorio" });
  if (!sesionId) return res.status(400).json({ error: "El ID de la sesión es obligatorio" });

  const instruccionCurso = await supabase
    .from('SesionCurso')
    .select(`
      Descripcion,
      Curso (
        Instruccional,
        Academia (
          Descripcion
        )
      )
    `)
    .eq('Id', sesionId)
    .single() as any;

  if (instruccionCurso.error || !instruccionCurso.data)
    return res.status(400).json({ error: "No se encontró la clase" });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendToken = (token: string) => res.write(`data: ${JSON.stringify({ token })}\n\n`);

  let newMessage = message.replace(/\n/g, " ");
  newMessage = "Responde de forma breve y concisa o solo si el mensaje siguiente lo contradice: " + message;

  try {
    const assistantService = new AssistantService(
      apiKey,
      assistantId,
      instruccionCurso.data.Curso.Academia.Descripcion,
      instruccionCurso.data.Curso.Instruccional,
      instruccionCurso.data.Descripcion
    );
    const { threadId: newThreadId } = await assistantService.streamResponse(threadId || null, newMessage, sendToken);
    res.write(`data: ${JSON.stringify({ done: true, threadId: newThreadId })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`);
    res.end();
  }
};

/**
 * @swagger
 * /Asistente/GenerateContentSesionBySesionId:
 *   post:
 *     summary: Envía un mensaje al asistente usando la instrucción de una sesión, su curso y academia
 *     tags: [Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *               sesionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stream SSE
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */

export const generateContentSesionBySesionId = async (req: Request, res: Response) => {
  const { threadId, sesionId } = req.body;
  if (!sesionId) return res.status(400).json({ error: "El ID de la sesión es obligatorio" });

  const instruccionSesion = await supabase
    .from('SesionCurso')
    .select(`
      Instruccional,
      Descripcion,
      Curso (
        Instruccional,
        Academia (
          Descripcion
        )
      )
    `)
    .eq('Id', sesionId)
    .single() as any;

  if (instruccionSesion.error || !instruccionSesion.data)
    return res.status(400).json({ error: "No se encontró la clase" });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendToken = (token: string) => res.write(`data: ${JSON.stringify({ token })}\n\n`);

  try {
    const assistantService = new AssistantService(
      apiKey,
      assistantId,
      instruccionSesion.data.Curso.Academia.Descripcion,
      instruccionSesion.data.Curso.Descripcion,
      instruccionSesion.data.Descripcion
    );

    const { threadId: newThreadId } = await assistantService.streamResponse(threadId || null, instruccionSesion.data.Instruccional, sendToken);
    res.write(`data: ${JSON.stringify({ done: true, threadId: newThreadId })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`);
    res.end();
  }
};