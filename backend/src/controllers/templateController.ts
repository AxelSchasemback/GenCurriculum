import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Obtener todas las plantillas
export const getAllTemplates = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una plantilla específica
export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 