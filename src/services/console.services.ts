import { NodeSSH } from 'node-ssh';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const ssh = new NodeSSH();
const host = process.env.SSH_IP_EXTERNAL;
const username = process.env.SSH_USER;
const password = process.env.PASSWORD; // O usa privateKeyPath para autenticación con clave privada

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Por problema con Vercel se sube como string
const value = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`

export class SSHClient {
  private isConnected = false;

  async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      await ssh.connect({
        host,
        username,
        privateKey: value,
      });

      this.isConnected = true;
      console.log('✅ Conexión SSH establecida');
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      throw error;
    }
  }

  async exec(command: string): Promise<string> {
    if (!this.isConnected) throw new Error('No hay conexión activa');
    const result = await ssh.execCommand(command);
    if (result.stderr) {
      console.error(`⚠️ Error ejecutando "${command}":`, result.stderr);
      return result.stderr.trim();
    }
    return result.stdout.trim();
  }

  async upload(localPath: string, remotePath: string): Promise<void> {
    if (!this.isConnected) throw new Error('No hay conexión activa');
    await ssh.putFile(localPath, remotePath);
    console.log(`📂 Archivo subido: ${localPath} → ${remotePath}`);
  }

  async download(remotePath: string, localPath: string): Promise<void> {
    if (!this.isConnected) throw new Error('No hay conexión activa');
    await ssh.getFile(localPath, remotePath);
    console.log(`📥 Archivo descargado: ${remotePath} → ${localPath}`);
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      ssh.dispose();
      this.isConnected = false;
      console.log('🔌 Conexión SSH cerrada');
    }
  }
}
