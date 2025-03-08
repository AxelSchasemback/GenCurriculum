import React from 'react';
import { profilesData } from '../utils/sampleData';

/**
 * Componente que muestra una representación visual de una plantilla de CV
 * adaptada al diseño específico de cada plantilla
 */
const DefaultTemplateImage = ({ templateId, profileType = 'developer' }) => {
  const profile = profilesData[profileType];
  const colors = {
    modern: { primary: '#3B82F6', secondary: '#EFF6FF' },
    minimalist: { primary: '#6B7280', secondary: '#F9FAFB' },
    chronological: { primary: '#10B981', secondary: '#ECFDF5' },
    creative: { primary: '#EC4899', secondary: '#FCE7F3' },
    executive: { primary: '#8B5CF6', secondary: '#EDE9FE' },
    twocolumn: { primary: '#F59E0B', secondary: '#FEF3C7' },
  };

  const color = colors[templateId] || colors.modern;

  // Renderizar plantilla Modern (diseño por defecto)
  const renderModernTemplate = () => (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Encabezado */}
      <div className="p-4 flex flex-col items-center justify-center" style={{ backgroundColor: 'white' }}>
        <div className="text-lg font-bold text-neutral-900">{profile.personalInfo.name}</div>
        <div className="text-sm text-neutral-600">{profile.personalInfo.title}</div>
        <div className="text-xs text-neutral-500 mt-1 flex space-x-2">
          <span>{profile.personalInfo.email}</span>
          <span>•</span>
          <span>{profile.personalInfo.phone}</span>
        </div>
      </div>
      
      {/* Línea separadora */}
      <div className="h-1 w-full" style={{ backgroundColor: color.primary }}></div>
      
      {/* Contenido */}
      <div className="flex-1 p-4">
        {/* Resumen */}
        <div className="mb-3">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            RESUMEN
          </div>
          <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
        
        {/* Sección de experiencia */}
        <div className="mb-3">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            EXPERIENCIA
          </div>
          {profile.experience.slice(0, 2).map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 w-1/2 bg-gray-300 rounded mt-1"></div>
              <div className="h-2 w-5/6 bg-gray-200 rounded mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Sección de educación */}
        <div className="mb-3">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            EDUCACIÓN
          </div>
          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="h-2 w-2/5 bg-gray-300 rounded"></div>
                <div className="h-2 w-1/5 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 w-1/3 bg-gray-300 rounded mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Sección de habilidades */}
        <div>
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            HABILIDADES
          </div>
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div 
                key={index} 
                className="h-2 w-16 rounded"
                style={{ backgroundColor: color.primary }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar plantilla Minimalist
  const renderMinimalistTemplate = () => (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Encabezado minimalista */}
      <div className="p-4">
        <div className="text-lg font-bold text-neutral-900">{profile.personalInfo.name}</div>
        <div className="text-sm text-neutral-600 mb-1">{profile.personalInfo.title}</div>
        <div className="text-xs text-neutral-500 flex space-x-2 mb-3">
          <span>{profile.personalInfo.email}</span>
          <span>•</span>
          <span>{profile.personalInfo.phone}</span>
        </div>
        
        {/* Línea separadora sutil */}
        <div className="h-px w-full bg-neutral-200 mb-3"></div>
        
        {/* Resumen */}
        <div className="mb-3">
          <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex-1 px-4">
        {/* Sección de experiencia */}
        <div className="mb-3">
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Experiencia
          </div>
          {profile.experience.slice(0, 2).map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 w-1/2 bg-gray-300 rounded mt-1"></div>
              <div className="h-2 w-5/6 bg-gray-200 rounded mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Sección de educación */}
        <div className="mb-3">
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Educación
          </div>
          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="h-2 w-2/5 bg-gray-300 rounded"></div>
                <div className="h-2 w-1/5 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 w-1/3 bg-gray-300 rounded mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Sección de habilidades */}
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Habilidades
          </div>
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div 
                key={index} 
                className="h-2 w-16 rounded bg-neutral-300"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar plantilla Creative (dos columnas con sidebar de color)
  const renderCreativeTemplate = () => (
    <div className="w-full h-full bg-white flex flex-row">
      {/* Sidebar */}
      <div className="w-1/3 p-3 flex flex-col" style={{ backgroundColor: color.primary }}>
        {/* Foto de perfil (círculo) */}
        <div className="w-16 h-16 rounded-full bg-white opacity-80 mx-auto mb-3"></div>
        
        {/* Información de contacto */}
        <div className="mb-4">
          <div className="text-xs font-bold text-white uppercase mb-2">Contacto</div>
          <div className="h-2 w-full bg-white bg-opacity-30 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-white bg-opacity-30 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-white bg-opacity-30 rounded"></div>
        </div>
        
        {/* Habilidades */}
        <div className="mb-4">
          <div className="text-xs font-bold text-white uppercase mb-2">Habilidades</div>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="mb-1">
              <div className="h-2 w-full bg-white bg-opacity-30 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Educación */}
        <div>
          <div className="text-xs font-bold text-white uppercase mb-2">Educación</div>
          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="h-2 w-4/5 bg-white bg-opacity-30 rounded mb-1"></div>
              <div className="h-2 w-3/5 bg-white bg-opacity-30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="w-2/3 p-3">
        {/* Nombre y título */}
        <div className="mb-4">
          <div className="text-lg font-bold" style={{ color: color.primary }}>{profile.personalInfo.name}</div>
          <div className="text-sm">{profile.personalInfo.title}</div>
        </div>
        
        {/* Resumen */}
        <div className="mb-4">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>Perfil</div>
          <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
        
        {/* Experiencia */}
        <div>
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>Experiencia</div>
          {profile.experience.slice(0, 2).map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="h-2 w-4/5 bg-gray-300 rounded mb-1"></div>
              <div className="h-2 w-3/5 bg-gray-200 rounded mb-1"></div>
              <div className="h-2 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar plantilla Executive
  const renderExecutiveTemplate = () => (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Encabezado ejecutivo */}
      <div className="p-4 border-b-2" style={{ borderColor: color.primary }}>
        <div className="flex justify-between">
          <div className="w-2/3">
            <div className="text-lg font-bold uppercase tracking-wider" style={{ color: color.primary }}>
              {profile.personalInfo.name}
            </div>
            <div className="text-sm text-neutral-600">{profile.personalInfo.title}</div>
          </div>
          <div className="w-1/3 text-right">
            <div className="text-xs text-neutral-500">{profile.personalInfo.email}</div>
            <div className="text-xs text-neutral-500">{profile.personalInfo.phone}</div>
            <div className="text-xs text-neutral-500">{profile.personalInfo.location}</div>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex-1 p-4">
        {/* Resumen profesional */}
        <div className="mb-4">
          <div className="text-sm font-bold uppercase mb-2" style={{ color: color.primary }}>
            Resumen Profesional
          </div>
          <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
        
        {/* Experiencia profesional */}
        <div className="mb-4">
          <div className="text-sm font-bold uppercase mb-2" style={{ color: color.primary }}>
            Experiencia Profesional
          </div>
          {profile.experience.slice(0, 2).map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between mb-1">
                <div className="h-2 w-2/5 bg-gray-800 rounded"></div>
                <div className="h-2 w-1/4 bg-gray-400 rounded"></div>
              </div>
              <div className="h-2 w-1/2 bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
              <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Educación */}
        <div>
          <div className="text-sm font-bold uppercase mb-2" style={{ color: color.primary }}>
            Educación
          </div>
          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <div className="h-2 w-2/5 bg-gray-800 rounded"></div>
                <div className="h-2 w-1/4 bg-gray-400 rounded"></div>
              </div>
              <div className="h-2 w-1/2 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar plantilla Chronological
  const renderChronologicalTemplate = () => (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Encabezado */}
      <div className="p-4 border-b" style={{ borderColor: color.primary }}>
        <div className="flex justify-between">
          <div>
            <div className="text-lg font-bold" style={{ color: color.primary }}>{profile.personalInfo.name}</div>
            <div className="text-sm text-neutral-600">{profile.personalInfo.title}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral-500">{profile.personalInfo.email}</div>
            <div className="text-xs text-neutral-500">{profile.personalInfo.phone}</div>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex-1 p-4">
        {/* Resumen */}
        <div className="mb-4">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            Resumen Profesional
          </div>
          <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
        
        {/* Experiencia en orden cronológico */}
        <div className="mb-4">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            Experiencia Profesional
          </div>
          {profile.experience.slice(0, 2).map((exp, index) => (
            <div key={index} className="mb-3 pl-3 border-l-2" style={{ borderColor: color.primary }}>
              <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-gray-700 rounded"></div>
                <div className="h-2 w-1/4 bg-gray-400 rounded"></div>
              </div>
              <div className="h-2 w-1/2 bg-gray-500 rounded mt-1"></div>
              <div className="h-2 w-5/6 bg-gray-200 rounded mt-1"></div>
              <div className="h-2 w-4/6 bg-gray-200 rounded mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Educación */}
        <div>
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            Educación
          </div>
          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index} className="pl-3 border-l-2" style={{ borderColor: color.primary }}>
              <div className="flex justify-between">
                <div className="h-2 w-2/5 bg-gray-700 rounded"></div>
                <div className="h-2 w-1/5 bg-gray-400 rounded"></div>
              </div>
              <div className="h-2 w-1/3 bg-gray-500 rounded mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar plantilla TwoColumn
  const renderTwoColumnTemplate = () => (
    <div className="w-full h-full bg-white flex flex-row">
      {/* Columna izquierda */}
      <div className="w-1/3 h-full p-3" style={{ backgroundColor: color.secondary }}>
        {/* Nombre y título en columna izquierda */}
        <div className="mb-3">
          <div className="text-sm font-bold text-neutral-900">{profile.personalInfo.name}</div>
          <div className="text-xs text-neutral-600 mb-2">{profile.personalInfo.title}</div>
        </div>
        
        {/* Información de contacto */}
        <div className="mb-3">
          <div className="text-xs font-bold mb-2" style={{ color: color.primary }}>
            CONTACTO
          </div>
          <div className="h-2 w-full bg-gray-300 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-300 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-300 rounded mb-1"></div>
        </div>
        
        {/* Habilidades - debajo de contacto */}
        <div className="mb-3">
          <div className="text-xs font-bold mb-2" style={{ color: color.primary }}>
            HABILIDADES
          </div>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-center">
                <div className="h-2 w-1/2 bg-gray-400 rounded"></div>
                <div className="w-1/2 pl-1">
                  <div className="h-1 w-full bg-gray-200 rounded">
                    <div className="h-1 rounded" style={{ width: '70%', backgroundColor: color.primary }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Idiomas */}
        <div>
          <div className="text-xs font-bold mb-2" style={{ color: color.primary }}>
            IDIOMAS
          </div>
          {[1, 2].map((_, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-center">
                <div className="h-2 w-1/2 bg-gray-400 rounded"></div>
                <div className="w-1/2 pl-1">
                  <div className="h-1 w-full bg-gray-200 rounded">
                    <div className="h-1 rounded" style={{ width: index === 0 ? '90%' : '60%', backgroundColor: color.primary }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Columna derecha */}
      <div className="w-2/3 h-full p-3">
        {/* Perfil profesional */}
        <div className="mb-3">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            PERFIL PROFESIONAL
          </div>
          <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
        
        {/* Experiencia */}
        <div className="mb-3">
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            EXPERIENCIA
          </div>
          {profile.experience.slice(0, 2).map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="h-2 w-1/3 bg-gray-700 rounded"></div>
                <div className="h-2 w-1/4 bg-gray-400 rounded"></div>
              </div>
              <div className="h-2 w-1/2 bg-gray-500 rounded mt-1"></div>
              <div className="h-2 w-full bg-gray-200 rounded mt-1"></div>
              <div className="h-2 w-5/6 bg-gray-200 rounded mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Educación */}
        <div>
          <div className="text-sm font-bold mb-2" style={{ color: color.primary }}>
            EDUCACIÓN
          </div>
          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <div className="h-2 w-2/5 bg-gray-700 rounded"></div>
                <div className="h-2 w-1/5 bg-gray-400 rounded"></div>
              </div>
              <div className="h-2 w-1/3 bg-gray-500 rounded mt-1"></div>
              <div className="h-2 w-2/3 bg-gray-200 rounded mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar la plantilla según el ID
  switch (templateId) {
    case 'modern':
      return renderModernTemplate();
    case 'minimalist':
      return renderMinimalistTemplate();
    case 'creative':
      return renderCreativeTemplate();
    case 'executive':
      return renderExecutiveTemplate();
    case 'chronological':
      return renderChronologicalTemplate();
    case 'twocolumn':
      return renderTwoColumnTemplate();
    default:
      return renderModernTemplate();
  }
};

export default DefaultTemplateImage; 