import { Request, Response } from 'express';
import { SSHClient } from '../services/console.services.js';


/**
 * @swagger
 * /Consola/ExecCommand:
 *   post:
 *     summary: Ejecuta un comando remoto vía SSH
 *     description: Recibe un comando en el cuerpo de la solicitud y lo ejecuta en la VM remota usando SSH. Retorna la salida estándar del comando.
 *     tags:
 *       - SSH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - command
 *             properties:
 *               command:
 *                 type: string
 *                 example: "uptime"
 *                 description: Comando que se ejecutará en la VM remota.
 *     responses:
 *       200:
 *         description: Comando ejecutado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Salida estándar del comando ejecutado
 *                   example: " 11:23:45 up 10 days,  3:12,  2 users,  load average: 0.15, 0.10, 0.05"
 *       400:
 *         description: Error por falta de comando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El comando es requerido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
export const ExecCommand = async (req: Request, res: Response) => {
  const { command } = req.body;
  if (!command)
    return res.status(400).json({ error: 'El comando es requerido' });

  try {
    const sshClient = new SSHClient();
    await sshClient.connect();
    const result = await sshClient.exec(command);
    res.json({ result });
  } catch (error) {
    console.error('Error ejecutando comando:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
