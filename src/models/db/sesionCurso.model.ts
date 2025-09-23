import { Curso } from "./curso.model.js";
import { InscripcionUsuario } from "./inscripcionUsuario.model.js";
import { MaterialSesionCurso } from "./materialSesionCurso.model.js";

export interface SesionCurso {
  Id: string;
  Nombre: string;
  Descripcion?: string;
  Avatar?: string;
  VideoURL?: string;
  LecturaURL?: string;
  CursoId: string;
  DuracionLectura?: number;
  DuracionVideo?: number;
  Instruccional?: string;
  Estado: boolean;
  FechaRegistro: Date;

  Curso?: Curso;
  Materiales?: MaterialSesionCurso[];
  Inscripciones?: InscripcionUsuario[];
}
