import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { Resume } from '../models/types';

// Obtener todos los currículums de un usuario
export const getUserResumes = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('userId', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un currículum específico
export const getResumeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Obtener el currículum
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .eq('userId', userId)
      .single();

    if (resumeError) {
      return res.status(404).json({ error: 'Currículum no encontrado' });
    }

    // Obtener experiencias
    const { data: experiences, error: experiencesError } = await supabase
      .from('experiences')
      .select('*')
      .eq('resumeId', id);

    if (experiencesError) {
      return res.status(400).json({ error: experiencesError.message });
    }

    // Obtener educación
    const { data: education, error: educationError } = await supabase
      .from('education')
      .select('*')
      .eq('resumeId', id);

    if (educationError) {
      return res.status(400).json({ error: educationError.message });
    }

    // Obtener habilidades
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .eq('resumeId', id);

    if (skillsError) {
      return res.status(400).json({ error: skillsError.message });
    }

    // Combinar todo en un solo objeto
    const completeResume = {
      ...resume,
      experience: experiences || [],
      education: education || [],
      skills: skills ? skills.map(skill => skill.name) : []
    };

    res.status(200).json(completeResume);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo currículum
export const createResume = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const resumeData: Resume = req.body;
    
    // Asegurarse de que el userId coincida con el usuario autenticado
    resumeData.userId = userId;

    // Insertar el currículum principal
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        userId: resumeData.userId,
        templateId: resumeData.templateId,
        title: resumeData.title,
        personalInfo: resumeData.personalInfo
      })
      .select()
      .single();

    if (resumeError) {
      return res.status(400).json({ error: resumeError.message });
    }

    const resumeId = resume.id;

    // Insertar experiencias
    if (resumeData.experience && resumeData.experience.length > 0) {
      const experiencesWithResumeId = resumeData.experience.map(exp => ({
        ...exp,
        resumeId
      }));

      const { error: experiencesError } = await supabase
        .from('experiences')
        .insert(experiencesWithResumeId);

      if (experiencesError) {
        return res.status(400).json({ error: experiencesError.message });
      }
    }

    // Insertar educación
    if (resumeData.education && resumeData.education.length > 0) {
      const educationWithResumeId = resumeData.education.map(edu => ({
        ...edu,
        resumeId
      }));

      const { error: educationError } = await supabase
        .from('education')
        .insert(educationWithResumeId);

      if (educationError) {
        return res.status(400).json({ error: educationError.message });
      }
    }

    // Insertar habilidades
    if (resumeData.skills && resumeData.skills.length > 0) {
      const skillsWithResumeId = resumeData.skills.map(skill => ({
        name: skill,
        resumeId
      }));

      const { error: skillsError } = await supabase
        .from('skills')
        .insert(skillsWithResumeId);

      if (skillsError) {
        return res.status(400).json({ error: skillsError.message });
      }
    }

    res.status(201).json({
      id: resumeId,
      message: 'Currículum creado exitosamente'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un currículum existente
export const updateResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const resumeData: Resume = req.body;

    // Verificar que el currículum pertenezca al usuario
    const { data: existingResume, error: checkError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .eq('userId', userId)
      .single();

    if (checkError || !existingResume) {
      return res.status(404).json({ error: 'Currículum no encontrado o no autorizado' });
    }

    // Actualizar el currículum principal
    const { error: resumeError } = await supabase
      .from('resumes')
      .update({
        templateId: resumeData.templateId,
        title: resumeData.title,
        personalInfo: resumeData.personalInfo,
        updatedAt: new Date()
      })
      .eq('id', id);

    if (resumeError) {
      return res.status(400).json({ error: resumeError.message });
    }

    // Eliminar experiencias existentes y agregar las nuevas
    if (resumeData.experience) {
      // Eliminar experiencias existentes
      await supabase
        .from('experiences')
        .delete()
        .eq('resumeId', id);

      // Agregar nuevas experiencias
      if (resumeData.experience.length > 0) {
        const experiencesWithResumeId = resumeData.experience.map(exp => ({
          ...exp,
          resumeId: id
        }));

        const { error: experiencesError } = await supabase
          .from('experiences')
          .insert(experiencesWithResumeId);

        if (experiencesError) {
          return res.status(400).json({ error: experiencesError.message });
        }
      }
    }

    // Eliminar educación existente y agregar la nueva
    if (resumeData.education) {
      // Eliminar educación existente
      await supabase
        .from('education')
        .delete()
        .eq('resumeId', id);

      // Agregar nueva educación
      if (resumeData.education.length > 0) {
        const educationWithResumeId = resumeData.education.map(edu => ({
          ...edu,
          resumeId: id
        }));

        const { error: educationError } = await supabase
          .from('education')
          .insert(educationWithResumeId);

        if (educationError) {
          return res.status(400).json({ error: educationError.message });
        }
      }
    }

    // Eliminar habilidades existentes y agregar las nuevas
    if (resumeData.skills) {
      // Eliminar habilidades existentes
      await supabase
        .from('skills')
        .delete()
        .eq('resumeId', id);

      // Agregar nuevas habilidades
      if (resumeData.skills.length > 0) {
        const skillsWithResumeId = resumeData.skills.map(skill => ({
          name: skill,
          resumeId: id
        }));

        const { error: skillsError } = await supabase
          .from('skills')
          .insert(skillsWithResumeId);

        if (skillsError) {
          return res.status(400).json({ error: skillsError.message });
        }
      }
    }

    res.status(200).json({
      id,
      message: 'Currículum actualizado exitosamente'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un currículum
export const deleteResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verificar que el currículum pertenezca al usuario
    const { data: existingResume, error: checkError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .eq('userId', userId)
      .single();

    if (checkError || !existingResume) {
      return res.status(404).json({ error: 'Currículum no encontrado o no autorizado' });
    }

    // Eliminar habilidades relacionadas
    await supabase
      .from('skills')
      .delete()
      .eq('resumeId', id);

    // Eliminar educación relacionada
    await supabase
      .from('education')
      .delete()
      .eq('resumeId', id);

    // Eliminar experiencias relacionadas
    await supabase
      .from('experiences')
      .delete()
      .eq('resumeId', id);

    // Eliminar el currículum
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Currículum eliminado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 