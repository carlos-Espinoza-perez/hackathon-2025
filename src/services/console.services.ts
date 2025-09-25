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
const value = fs.readFileSync(path.resolve(__dirname, './ssh/id_rsa_gcp'), 'utf8');

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
