import { RegistroUsuarioProgreso } from "./registroUsuarioProgreso.model.js";
import { Usuario } from "./usuario.model.js";

export interface UsuarioProgreso {
  Id: string;
  UsuarioId: string;
  Puntos: number; // Decimal se mapea a number
  Racha: number;
  RetosCompletados: number;
  Estado: boolean;
  FechaInicio: Date;

  Usuario?: Usuario;
  Registros?: RegistroUsuarioProgreso[];
}