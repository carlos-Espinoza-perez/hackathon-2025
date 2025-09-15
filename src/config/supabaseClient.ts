import { createClient } from "@supabase/supabase-js";

import dotenv from 'dotenv';

// Carga variables de entorno
dotenv.config();


// Usamos la service role key porque necesitamos permisos totales
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabase;
