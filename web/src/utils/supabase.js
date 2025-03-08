import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://xrshlornefivfldshdgv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyc2hsb3JuZWZpdmZsZHNoZGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NTgyMDIsImV4cCI6MjA1NjUzNDIwMn0.PvIs0Iy8ncqI7JlaGJdRhJ7KMqdsOPlEfX3wFrL_WZE';

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones de autenticación
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session, error };
};

// Funciones para manejar currículums
export const fetchUserResumes = async (userId) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('userId', userId)
    .order('updatedAt', { ascending: false });
  
  return { resumes: data, error };
};

/**
 * Obtiene un currículum específico por su ID
 * @param {string} resumeId - ID del currículum a obtener
 * @param {string} userId - ID del usuario propietario del currículum
 * @returns {Promise<{resume: Object|null, error: Error|null}>}
 */
export const fetchResumeById = async (resumeId, userId) => {
  try {
    // Obtener el currículum básico
    const { data: resumeData, error: resumeError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', userId)
      .single();

    if (resumeError) {
      throw resumeError;
    }

    if (!resumeData) {
      return { resume: null, error: null };
    }

    // Obtener experiencia laboral
    const { data: experienceData, error: experienceError } = await supabase
      .from('experiences')
      .select('*')
      .eq('resume_id', resumeId)
      .order('start_date', { ascending: false });

    if (experienceError) {
      throw experienceError;
    }

    // Obtener educación
    const { data: educationData, error: educationError } = await supabase
      .from('education')
      .select('*')
      .eq('resume_id', resumeId)
      .order('start_date', { ascending: false });

    if (educationError) {
      throw educationError;
    }

    // Obtener habilidades
    const { data: skillsData, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .eq('resume_id', resumeId);

    if (skillsError) {
      throw skillsError;
    }

    // Formatear los datos para el frontend
    const resume = {
      ...resumeData,
      personalInfo: {
        name: resumeData.name || '',
        title: resumeData.job_title || '',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        location: resumeData.location || '',
        summary: resumeData.summary || '',
      },
      experience: experienceData.map(exp => ({
        position: exp.position,
        company: exp.company,
        location: exp.location,
        startDate: exp.start_date,
        endDate: exp.end_date || 'Presente',
        description: exp.description,
      })),
      education: educationData.map(edu => ({
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        startDate: edu.start_date,
        endDate: edu.end_date || 'Presente',
        description: edu.description,
      })),
      skills: skillsData.map(skill => skill.name),
    };

    return { resume, error: null };
  } catch (error) {
    console.error('Error al obtener el currículum:', error);
    return { resume: null, error };
  }
};

export const fetchTemplates = async () => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('name');
  
  return { templates: data, error };
};

export const createResume = async (resumeData) => {
  // Insertar el currículum principal
  const { data: resumeInsertData, error: resumeInsertError } = await supabase
    .from('resumes')
    .insert([
      {
        title: resumeData.title,
        templateId: resumeData.templateId,
        userId: resumeData.userId,
        personalInfo: resumeData.personalInfo
      }
    ])
    .select()
    .single();

  if (resumeInsertError) {
    return { resume: null, error: resumeInsertError };
  }

  const resumeId = resumeInsertData.id;

  // Insertar experiencias si existen
  if (resumeData.experience && resumeData.experience.length > 0) {
    const experiencesToInsert = resumeData.experience.map(exp => ({
      resumeId,
      position: exp.position,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description
    }));

    const { error: experienceInsertError } = await supabase
      .from('experiences')
      .insert(experiencesToInsert);

    if (experienceInsertError) {
      return { resume: resumeInsertData, error: experienceInsertError };
    }
  }

  // Insertar educación si existe
  if (resumeData.education && resumeData.education.length > 0) {
    const educationToInsert = resumeData.education.map(edu => ({
      resumeId,
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description
    }));

    const { error: educationInsertError } = await supabase
      .from('education')
      .insert(educationToInsert);

    if (educationInsertError) {
      return { resume: resumeInsertData, error: educationInsertError };
    }
  }

  // Insertar habilidades si existen
  if (resumeData.skills && resumeData.skills.length > 0) {
    const skillsToInsert = resumeData.skills.map(skill => ({
      resumeId,
      name: skill
    }));

    const { error: skillsInsertError } = await supabase
      .from('skills')
      .insert(skillsToInsert);

    if (skillsInsertError) {
      return { resume: resumeInsertData, error: skillsInsertError };
    }
  }

  return { resume: resumeInsertData, error: null };
};

export const updateResume = async (resumeId, userId, resumeData) => {
  // Actualizar el currículum principal
  const { error: resumeUpdateError } = await supabase
    .from('resumes')
    .update({
      title: resumeData.title,
      personalInfo: resumeData.personalInfo
    })
    .eq('id', resumeId)
    .eq('userId', userId);

  if (resumeUpdateError) {
    return { error: resumeUpdateError };
  }

  // Actualizar experiencias
  // Primero eliminar todas las experiencias existentes
  const { error: deleteExpError } = await supabase
    .from('experiences')
    .delete()
    .eq('resumeId', resumeId);

  if (deleteExpError) {
    return { error: deleteExpError };
  }

  // Luego insertar las nuevas experiencias
  if (resumeData.experience && resumeData.experience.length > 0) {
    const experiencesToInsert = resumeData.experience.map(exp => ({
      resumeId,
      position: exp.position,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description
    }));

    const { error: insertExpError } = await supabase
      .from('experiences')
      .insert(experiencesToInsert);

    if (insertExpError) {
      return { error: insertExpError };
    }
  }

  // Actualizar educación
  // Primero eliminar toda la educación existente
  const { error: deleteEduError } = await supabase
    .from('education')
    .delete()
    .eq('resumeId', resumeId);

  if (deleteEduError) {
    return { error: deleteEduError };
  }

  // Luego insertar la nueva educación
  if (resumeData.education && resumeData.education.length > 0) {
    const educationToInsert = resumeData.education.map(edu => ({
      resumeId,
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description
    }));

    const { error: insertEduError } = await supabase
      .from('education')
      .insert(educationToInsert);

    if (insertEduError) {
      return { error: insertEduError };
    }
  }

  // Actualizar habilidades
  // Primero eliminar todas las habilidades existentes
  const { error: deleteSkillsError } = await supabase
    .from('skills')
    .delete()
    .eq('resumeId', resumeId);

  if (deleteSkillsError) {
    return { error: deleteSkillsError };
  }

  // Luego insertar las nuevas habilidades
  if (resumeData.skills && resumeData.skills.length > 0) {
    const skillsToInsert = resumeData.skills.map(skill => ({
      resumeId,
      name: skill
    }));

    const { error: insertSkillsError } = await supabase
      .from('skills')
      .insert(skillsToInsert);

    if (insertSkillsError) {
      return { error: insertSkillsError };
    }
  }

  return { error: null };
};

/**
 * Elimina un currículum específico
 * @param {string} resumeId - ID del currículum a eliminar
 * @param {string} userId - ID del usuario propietario del currículum
 * @returns {Promise<{error: Error|null}>}
 */
export const deleteResume = async (resumeId, userId) => {
  try {
    // Verificar que el currículum pertenece al usuario
    const { data: resumeData, error: checkError } = await supabase
      .from('resumes')
      .select('id')
      .eq('id', resumeId)
      .eq('user_id', userId)
      .single();

    if (checkError) {
      throw checkError;
    }

    if (!resumeData) {
      return { error: new Error('No tienes permiso para eliminar este currículum') };
    }

    // Eliminar habilidades asociadas
    const { error: skillsError } = await supabase
      .from('skills')
      .delete()
      .eq('resume_id', resumeId);

    if (skillsError) {
      throw skillsError;
    }

    // Eliminar educación asociada
    const { error: educationError } = await supabase
      .from('education')
      .delete()
      .eq('resume_id', resumeId);

    if (educationError) {
      throw educationError;
    }

    // Eliminar experiencias asociadas
    const { error: experienceError } = await supabase
      .from('experiences')
      .delete()
      .eq('resume_id', resumeId);

    if (experienceError) {
      throw experienceError;
    }

    // Finalmente, eliminar el currículum
    const { error: resumeError } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId);

    if (resumeError) {
      throw resumeError;
    }

    return { error: null };
  } catch (error) {
    console.error('Error al eliminar el currículum:', error);
    return { error };
  }
}; 