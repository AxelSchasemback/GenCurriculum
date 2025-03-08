import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Registrar usuario con Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Usuario registrado exitosamente. Por favor, verifica tu correo electrónico.',
      user: data.user
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Iniciar sesión con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: data.user,
      session: data.session
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Cerrar sesión
export const logout = async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener información del usuario actual
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // El middleware de autenticación ya ha verificado y adjuntado el usuario
    res.status(200).json({ user: req.user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Restablecer contraseña
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Instrucciones para restablecer contraseña enviadas al correo electrónico' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 