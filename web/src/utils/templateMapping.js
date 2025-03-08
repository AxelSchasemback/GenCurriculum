import ModernTemplate from '../templates/ModernTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import ChronologicalTemplate from '../templates/ChronologicalTemplate';
import TwoColumnTemplate from '../templates/TwoColumnTemplate';
import { templateScreenshots } from './templateScreenshots';

// Mapeo de IDs de plantillas a componentes
const templateMap = {
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  chronological: ChronologicalTemplate,
  twocolumn: TwoColumnTemplate,
};

// Comentado temporalmente
// const premiumTemplates = ['creative', 'executive', 'twocolumn'];

/**
 * Obtiene el componente de plantilla según su ID
 * @param {string} templateId - ID de la plantilla
 * @returns {React.Component} - Componente de la plantilla
 */
export const getTemplateById = (templateId) => {
  return templateMap[templateId] || templateMap.modern; // Plantilla moderna como fallback
};

/**
 * Verifica si una plantilla es premium
 * @returns {boolean} - Siempre devuelve false (temporalmente)
 * @note Temporalmente modificado para permitir acceso a todas las plantillas
 */
export const isPremiumTemplate = () => {
  // Temporalmente desactivado - todas las plantillas son accesibles
  return false;
};

/**
 * Obtiene todas las plantillas disponibles
 * @returns {Object[]} - Array de objetos con información de las plantillas
 */
export const getAllTemplates = () => {
  return [
    {
      id: 'modern',
      name: 'Profesional Moderno',
      description: 'Diseño limpio y profesional con un toque moderno.',
      image: templateScreenshots.modern,
      premium: false,
    },
    {
      id: 'minimalist',
      name: 'Minimalista',
      description: 'Estilo minimalista que destaca la información esencial.',
      image: templateScreenshots.minimalist,
      premium: false,
    },
    {
      id: 'chronological',
      name: 'Cronológico',
      description: 'Formato tradicional que destaca tu experiencia laboral en orden cronológico inverso.',
      image: templateScreenshots.chronological,
      premium: false,
    },
    {
      id: 'creative',
      name: 'Creativo',
      description: 'Plantilla creativa ideal para profesionales del diseño y artes.',
      image: templateScreenshots.creative,
      premium: false, // Temporalmente cambiado a false
    },
    {
      id: 'executive',
      name: 'Ejecutivo',
      description: 'Diseño elegante para perfiles ejecutivos y gerenciales.',
      image: templateScreenshots.executive,
      premium: false, // Temporalmente cambiado a false
    },
    {
      id: 'twocolumn',
      name: 'Dos Columnas',
      description: 'Formato moderno de dos columnas que destaca tus habilidades y experiencia.',
      image: templateScreenshots.twocolumn,
      premium: false, // Temporalmente cambiado a false
    },
  ];
};

export default templateMap; 