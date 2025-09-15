import supabase from "../config/supabaseClient.js";

export async function signUp(nombre: string, email: string, password: string) {
  // 1. Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) throw authError;

  const userId = authData.user.id;

  // 2. Crear registro en la tabla Usuario
  const { data: usuarioData, error: usuarioError } = await supabase
    .from('Usuario')
    .insert({
      id: userId,
      nombre,
      correo: email,
      estado: true,
      contrasena: "",
      fechaRegistro: new Date(),
    })
    .select()
    .single();

  if (usuarioError) throw usuarioError;

  return usuarioData;
}

export async function signIn(email: string, password: string) {
  // 1. Login con Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) throw new Error('Usuario no encontrado');

  // 2. Traer registro de la tabla Usuario
  const { data: usuarioData, error: usuarioError } = await supabase
    .from('Usuario')
    .select('*')
    .eq('id', userId)
    .single();

  if (usuarioError) throw usuarioError;

  return { session: authData.session, usuario: usuarioData };
}

export async function deleteUserByEmail(email: string) {
  // 1. Buscar usuario en la tabla Usuario
  const { data: usuarioData, error: usuarioError } = await supabase
    .from('Usuario')
    .select('id')
    .eq('correo', email)
    .limit(1); // <- limit evita problemas con .single()

  if (usuarioError) throw usuarioError;
  if (!usuarioData || usuarioData.length === 0)
    throw new Error('Usuario no encontrado');

  const userId = usuarioData[0].id;

  // 2. Eliminar usuario de Supabase Auth
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);
  if (authError) throw authError;

  // 3. Eliminar usuario de la tabla Usuario
  const { error: deleteError } = await supabase
    .from('Usuario')
    .delete()
    .eq('id', userId);

  if (deleteError) throw deleteError;

  return { message: `Usuario ${email} eliminado correctamente` };
}


export async function getUserByToken(accessToken: string) {
  // 1. Obtener usuario de Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) throw new Error('Usuario no encontrado');

  // 2. Obtener registro de la tabla Usuario
  const { data: usuarioData, error: usuarioError } = await supabase
    .from('Usuario')
    .select('*')
    .eq('id', userId)
    .single();

  if (usuarioError) throw usuarioError;

  return usuarioData;
}
