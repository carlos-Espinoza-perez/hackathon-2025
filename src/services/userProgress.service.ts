import supabase from "../config/supabaseClient.js";
import { RegistroUsuarioProgreso } from "../models/db/registroUsuarioProgreso.model.js";
import { UsuarioProgreso } from "../models/db/usuarioProgreso.model.js";
import { getUserLogin, newGuid } from "../utils/general.util.js";


export const getUsuarioProrgesoService = async () => {
  const user = await getUserLogin();
  const usuarioProgreso = await supabase
    .from("UsuarioProgreso")
    .select("*")
    .eq("UsuarioId", user.Id)
    .maybeSingle();

  return usuarioProgreso.data;
};

export const postRegistroUsuarioProgresoDayService = async (punto?: number, racha?: number, reto?: number) => {
  const user = await getUserLogin();
  // Revisar si ya tiene en la tabla de UsuarioProgreso
  const usuarioProgreso = await supabase
    .from("UsuarioProgreso")
    .select("*")
    .eq("UsuarioId", user.Id)
    .maybeSingle();

  let usuarioProgresoId: string;

  if (!usuarioProgreso.data) {
    // Si no tiene, crear uno nuevo
    const nuevoUsuarioProgreso = await supabase
      .from("UsuarioProgreso")
      .insert<UsuarioProgreso>({
        Id: newGuid(),
        UsuarioId: user.Id,
        Puntos: punto || 0,
        Racha: racha || 0,
        RetosCompletados: reto || 0,
        Estado: true,
        FechaInicio: new Date(),
      })
      .select()
      .maybeSingle();

    if (nuevoUsuarioProgreso.error) throw nuevoUsuarioProgreso.error;
    usuarioProgresoId = nuevoUsuarioProgreso.data.Id;
  } else {
    usuarioProgresoId = usuarioProgreso.data.Id;
  }

  // Actualizar los campos que se recibieron
  const updates: any = {};
  if (punto !== undefined) updates.Puntos = usuarioProgreso.data ? usuarioProgreso.data.Puntos + punto : punto;
  if (racha !== undefined) updates.Racha = usuarioProgreso.data ? usuarioProgreso.data.Racha + racha : racha;
  if (reto !== undefined) updates.RetosCompletados = usuarioProgreso.data ? usuarioProgreso.data.RetosCompletados + reto : reto;

  const updatedUsuarioProgreso = await supabase
    .from("UsuarioProgreso")
    .update(updates)
    .eq("Id", usuarioProgresoId)
    .select()
    .maybeSingle();

  // Se registra un historial en la tabla RegistroUsuarioProgreso
  const registro = await supabase
    .from("RegistroUsuarioProgreso")
    .insert<RegistroUsuarioProgreso>({
      Id: newGuid(),
      UsuarioProgresoId: usuarioProgresoId,
      Punto: punto || 0,
      Racha: racha || 0,
      RetosCompletados: reto || 0,
      Estado: true,
      Fecha: new Date(),
    })
    .select()
    .maybeSingle();

  if (updatedUsuarioProgreso.error) throw updatedUsuarioProgreso.error;
  if (registro.error) throw registro.error;

  const _usuarioProgreso = await supabase
    .from("UsuarioProgreso")
    .select("*")
    .eq("UsuarioId", user.Id)
    .maybeSingle();
    
  return _usuarioProgreso.data;
};

export const getListUsuarioProgresoTopFiveService = async () => {
  const { data, error } = await supabase
    .from("UsuarioProgreso")
    .select("*")
    .order('Puntos', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
};