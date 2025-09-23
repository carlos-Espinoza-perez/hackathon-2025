import supabase from "../config/supabaseClient.js";
import { getUserLogin } from "../utils/general.util.js";

export const getListCursosVistosRecientesServices = async () => { 
  const user = await getUserLogin();
  const listCursos = await supabase
    .from('InscripcionUsuario')
    .select('*')
    .eq('UsuarioId', user?.Id)
    .lt("Avance", 100)
    .filter('CursoId', 'not.is', null)
    .order('FechaRegistro', { ascending: false })
    .limit(5);
  
  return listCursos.data;
}

export const getListAcademyServices = async () => { 
  const listAcademy = await supabase
    .from('Academia')
    .select('*')
    .order('FechaRegistro', { ascending: false });
  
  return listAcademy.data;
}

export const getListLastCursosServices = async () => { 
  const listLastCursos = await supabase
    .from('Curso')
    .select('*')
    .order('FechaRegistro', { ascending: false })
    .limit(5);
  
  return listLastCursos.data;
}


export const getAcademyByAcademiaIdServices = async (academiaId: string) => {
  const academy = await supabase
    .from('Academia')
    .select('*')
    .eq('Id', academiaId)
    .single();

  return academy.data;
}

export const getListCursoByAcademiaIdServices = async (academiaId: string) => {
  const listCursos = await supabase
    .from('Curso')
    .select('*')
    .eq('AcademiaId', academiaId)
    .order('FechaRegistro', { ascending: false });

  return listCursos.data;
}

export const getProgresoByAcademiaIdServices = async (academiaId: string) => {
  const user = await getUserLogin();
  const { data: avanceActual } = await supabase
    .from('InscripcionUsuario')
    .select('sum:Avance, Curso!inner(AcademiaId)')
    .eq('UsuarioId', user?.Id)
    .eq('Curso.AcademiaId', academiaId)
    .single();

  
  const { count } = await supabase
    .from('Curso')
    .select('Id', { count: 'exact' })
    .eq('AcademiaId', academiaId);

  const avanceFinalRequerido = (count || 1) * 100;
  const porcentaje = (avanceFinalRequerido * 100) / avanceActual?.sum || 0; 

  return porcentaje;
}

export const getProgresoByCursoIdServices = async (cursoId: string) => {
  const user = await getUserLogin();
  const { data: avanceActual } = await supabase
    .from('InscripcionUsuario')
    .select('sum:Avance')
    .filter('cursoId', 'not.is', null)
    .eq('UsuarioId', user?.Id)
    .eq('CursoId', cursoId)
    .single();

  return avanceActual?.sum || 0;
}

export const getListSesionCursoByCursoIdServices = async (cursoId: string) => {
  const listSesiones = await supabase
    .from('SesionCurso')
    .select('*')
    .eq('CursoId', cursoId)
    .order('FechaRegistro', { ascending: true });

  return listSesiones.data;
}

export const getCursoByCursoIdServices = async (cursoId: string) => {
  const curso = await supabase
    .from('Curso')
    .select('*')
    .eq('Id', cursoId)
    .single();
  

  return curso.data;
}