import { Academia } from "./academia.model.js";
import { InscripcionUsuario } from "./inscripcionUsuario.model.js";
import { SesionCurso } from "./sesionCurso.model.js";

export interface Curso {
  Id: string;
  Nombre: string;
  Descripcion?: string;
  Avatar?: string;
  VideoURL?: string;
  AcademiaId: string;
  Dificultad: 'Novato' | 'Intermedio' | 'Avanzado';
  Instruccional?: string;
  Estado: boolean;
  FechaRegistro: Date;

  Academia?: Academia;
  Sesiones?: SesionCurso[];
  Inscripciones?: InscripcionUsuario[];
}