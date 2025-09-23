import { UsuarioProgreso } from "./usuarioProgreso.model.js";

export interface RegistroUsuarioProgreso {
  Id: string;
  UsuarioProgresoId: string;
  Punto: number;
  Racha: number;
  RetosCompletados: number;
  Estado: boolean;
  Fecha: Date;

  UsuarioProgreso?: UsuarioProgreso;
}