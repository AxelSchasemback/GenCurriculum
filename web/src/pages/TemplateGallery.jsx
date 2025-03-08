import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTemplates } from '../utils/templateMapping';
import TemplatePreviewCard from '../components/TemplatePreviewCard';

const TemplateGallery = () => {
  const [profileType, setProfileType] = useState('developer');
  const templates = getAllTemplates();
  
  // Perfiles disponibles para la vista previa
  const profiles = [
    { id: 'developer', name: 'Desarrollador' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'designer', name: 'Diseñador' },
    { id: 'executive', name: 'Ejecutivo' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Galería de Plantillas</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Explora nuestra colección de plantillas profesionales para crear tu currículum perfecto.
          Selecciona la que mejor se adapte a tu perfil y personalízala a tu gusto.
        </p>
      </div>
      
      {/* Selector de perfil para vista previa */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <span className="text-neutral-700 font-medium">Ver plantillas con perfil de:</span>
        <div className="flex space-x-2">
          {profiles.map(profile => (
            <button
              key={profile.id}
              onClick={() => setProfileType(profile.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                profileType === profile.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {profile.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Todas las plantillas (sin separación entre gratuitas y premium) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Todas las Plantillas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <TemplatePreviewCard
              key={template.id}
              template={template}
              profileType={profileType}
            />
          ))}
        </div>
      </div>
      
      {/* Nota informativa */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-blue-800 text-center">
          Todas las plantillas están disponibles para todos los usuarios temporalmente.
        </p>
      </div>
    </div>
  );
};

export default TemplateGallery; 