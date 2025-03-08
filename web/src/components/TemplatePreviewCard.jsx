import React from 'react';
import { Link } from 'react-router-dom';
import DefaultTemplateImage from './DefaultTemplateImage';

/**
 * Componente que muestra una tarjeta de vista previa para una plantilla de CV
 * Utiliza DefaultTemplateImage para mostrar una representación visual de la plantilla
 * @param {Object} template - Objeto con la información de la plantilla
 * @param {string} profileType - Tipo de perfil para mostrar (developer, marketing, etc.)
 * @param {Function} onSelect - Función opcional que se llama al seleccionar la plantilla
 */
const TemplatePreviewCard = ({ template, profileType = 'developer', onSelect = null }) => {
  const { id, name, description, premium } = template;
  
  // Todas las plantillas están disponibles temporalmente
  const isPremium = false;
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Vista previa de la plantilla */}
      <div className="relative h-64 overflow-hidden border-b border-neutral-200">
        <DefaultTemplateImage templateId={id} profileType={profileType} />
        
        {/* Insignia de premium si corresponde */}
        {premium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            PREMIUM
          </div>
        )}
      </div>
      
      {/* Información de la plantilla */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-neutral-900 mb-1">{name}</h3>
        <p className="text-sm text-neutral-600 mb-4">{description}</p>
        
        {/* Botones de acción */}
        <div className="flex space-x-2">
          {onSelect ? (
            <button
              onClick={() => onSelect(id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                premium && isPremium
                  ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
              disabled={premium && isPremium}
            >
              {premium && isPremium ? 'Requiere Premium' : 'Seleccionar'}
            </button>
          ) : (
            <Link
              to={`/builder?template=${id}`}
              className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-md text-sm font-medium text-center hover:bg-primary-700 transition-colors"
            >
              Usar plantilla
            </Link>
          )}
          
          <Link
            to={`/preview/${id}`}
            className="py-2 px-4 bg-neutral-100 text-neutral-700 rounded-md text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Vista previa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewCard; 