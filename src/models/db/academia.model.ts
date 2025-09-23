import { Curso } from "./curso.model.js";

export interface Academia {
  Id: string;
  Nombre: string;
  Descripcion?: string;
  Avatar?: string;
  TipoAcademia: 'Academia' | 'Laboratorio';
  Dificultad: 'Novato' | 'Intermedio' | 'Avanzado';
  Estado: boolean;
  FechaRegistro: Date;

  Cursos?: Curso[];
}