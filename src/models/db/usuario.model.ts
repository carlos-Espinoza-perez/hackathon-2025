import { InscripcionUsuario } from "./inscripcionUsuario.model.js";
import { UsuarioProgreso } from "./usuarioProgreso.model.js";

export interface Usuario {
  Id: string;
  Nombre?: string;
  Correo?: string;
  Avatar?: string;
  Contrasena?: string;
  Estado: boolean;
  FechaRegistro: Date;

  Progresos?: UsuarioProgreso[];
  Inscripciones?: InscripcionUsuario[];
}