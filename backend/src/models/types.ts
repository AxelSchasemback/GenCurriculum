// Tipos para la información personal
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

// Tipos para la experiencia laboral
export interface Experience {
  id?: string;
  resumeId: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipos para la educación
export interface Education {
  id?: string;
  resumeId: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipos para las habilidades
export interface Skill {
  id?: string;
  resumeId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para el currículum completo
export interface Resume {
  id?: string;
  userId: string;
  templateId: string;
  title: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para el usuario
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para las plantillas
export interface Template {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
} 