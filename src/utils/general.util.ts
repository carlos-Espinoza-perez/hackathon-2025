import supabase from "../config/supabaseClient.js";
import { Usuario } from "../models/db/usuario.model.js";

export const getUserLogin = async (): Promise<Usuario> => {
  const user = await supabase.auth.getUser();
  if (!user) throw new Error("Usuario no autenticado");

  const userId = user.data.user?.id;
  if (!userId) throw new Error("Id del usuario no encontrado");


  // 2. Obtener registro de la tabla Usuario
  const { data: usuarioData, error: usuarioError } = await supabase
    .from('Usuario')
    .select('*')
    .eq('Id', userId)
    .single();

  if (usuarioError) throw usuarioError;

  return usuarioData;
}

export const newGuid = () => {
  // Generar un ID único (puedes usar cualquier método que prefieras)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}