import { InscripcionUsuario } from "./inscripcionUsuario.model.js";
import { SesionCurso } from "./sesionCurso.model.js";

export interface MaterialSesionCurso {
  Id: string;
  IdentificadorManual?: string;
  SesionCursoId: string;
  Nombre: string;
  Avance?: number;
  Avatar?: string;
  ArchivoURL?: string;
  TipoMaterial: 'Documento' | 'Prueba' | 'Examen' | 'Laboratorio';
  Instruccional?: string;
  Estado: boolean;
  FechaRegistro: Date;

  SesionCurso?: SesionCurso;
  Inscripciones?: InscripcionUsuario[];
}