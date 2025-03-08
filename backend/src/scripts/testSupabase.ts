import { supabase } from '../config/supabase';

const testSupabaseConnection = async () => {
  try {
    // Probar la autenticación anónima para verificar la conexión
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error al conectar con Supabase:', error.message);
      return;
    }

    console.log('Conexión exitosa con Supabase');
    console.log('URL de Supabase:', process.env.SUPABASE_URL);
    
  } catch (error) {
    console.error('Error inesperado:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar la prueba
testSupabaseConnection(); 