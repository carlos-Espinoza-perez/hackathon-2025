import { Curso } from "./curso.model.js";
import { MaterialSesionCurso } from "./materialSesionCurso.model.js";
import { SesionCurso } from "./sesionCurso.model.js";
import { Usuario } from "./usuario.model.js";

export interface InscripcionUsuario {
  Id: string;
  UsuarioId: string;
  CursoId?: string;
  SesionCursoId?: string;
  MaterialSesionCursoId?: string;
  Avance?: number;
  Estado: boolean;
  FechaRegistro: Date;

  Usuario?: Usuario;
  Curso?: Curso;
  SesionCurso?: SesionCurso;
  MaterialSesion?: MaterialSesionCurso;
}
