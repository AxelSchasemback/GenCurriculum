import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

// Extendemos la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtener el token de autorización del encabezado
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No autorizado: Token no proporcionado' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar el token con Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return res.status(401).json({ error: 'No autorizado: Token inválido' });
    }
    
    // Adjuntar el usuario a la solicitud para su uso posterior
    req.user = data.user;
    
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 