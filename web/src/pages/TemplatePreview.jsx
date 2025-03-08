import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { getTemplateById, getAllTemplates } from '../utils/templateMapping';
import { profilesData } from '../utils/sampleData';

// Función para obtener parámetros de consulta de la URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TemplatePreview = () => {
  const { templateId } = useParams();
  const query = useQuery();
  const profileParam = query.get('profile');
  
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [templateInfo, setTemplateInfo] = useState(null);
  const [Template, setTemplate] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(profileParam || 'developer');
  const [previewData, setPreviewData] = useState(profilesData[profileParam || 'developer']);
  
  // Obtener el componente de plantilla según el ID e información detallada
  useEffect(() => {
    const TemplateComponent = getTemplateById(templateId);
    setTemplate(() => TemplateComponent);
    
    const templates = getAllTemplates();
    const template = templates.find(t => t.id === templateId);
    setTemplateInfo(template || {
      name: 'Plantilla',
      description: 'Vista previa de la plantilla',
      premium: false // Todas las plantillas son gratuitas temporalmente
    });
  }, [templateId]);

  // Actualizar los datos de previsualización cuando cambia el perfil seleccionado
  useEffect(() => {
    setPreviewData(profilesData[selectedProfile]);
  }, [selectedProfile]);

  // Actualizar el perfil seleccionado cuando cambia el parámetro de la URL
  useEffect(() => {
    if (profileParam && profilesData[profileParam]) {
      setSelectedProfile(profileParam);
    }
  }, [profileParam]);

  // Verificar si es una plantilla premium
  const handleUseTemplate = () => {
    window.location.href = `/builder?template=${templateId}`;
  };

  // Cambiar el perfil de ejemplo
  const handleProfileChange = (e) => {
    const newProfile = e.target.value;
    setSelectedProfile(newProfile);
    // Actualizar la URL sin recargar la página
    const url = new URL(window.location.href);
    url.searchParams.set('profile', newProfile);
    window.history.pushState({}, '', url.toString());
  };

  if (!templateInfo || !Template) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{templateInfo.name}</h1>
          <p className="text-neutral-600 mb-2">
            {templateInfo.description}
            {templateInfo.premium && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">Premium</span>}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">Profesional</span>
            <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">ATS-friendly</span>
            <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">PDF</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button 
            onClick={handleUseTemplate}
            className="btn-primary"
          >
            Usar esta plantilla
          </button>
          <Link to="/templates" className="btn-outline">
            Volver a la galería
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-neutral-900">Vista Previa</h2>
            <div className="flex items-center">
              <label htmlFor="profile-select" className="mr-2 text-sm text-neutral-600">
                Ver con perfil de:
              </label>
              <select
                id="profile-select"
                value={selectedProfile}
                onChange={handleProfileChange}
                className="form-select text-sm border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="developer">Desarrollador</option>
                <option value="marketing">Marketing</option>
                <option value="designer">Diseñador</option>
                <option value="executive">Ejecutivo</option>
              </select>
            </div>
          </div>
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <div className="h-[842px] bg-neutral-100 flex items-center justify-center">
              <div className="w-full h-full max-w-[595px] overflow-hidden bg-white shadow-lg">
                <PDFViewer width="100%" height="100%" className="border-0">
                  {Template && <Template data={previewData} />}
                </PDFViewer>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500 text-center">
            <p>Esta es una vista previa con datos de ejemplo. Puedes seleccionar diferentes perfiles para ver cómo se adapta la plantilla.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Características</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Ideal para</h3>
            <ul className="space-y-2">
              {templateId === 'modern' && (
                <>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Profesionales de cualquier sector</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Perfiles con experiencia media o senior</span>
                  </li>
                </>
              )}
              
              {templateId === 'minimalist' && (
                <>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Profesionales que valoran la simplicidad</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sectores tradicionales o conservadores</span>
                  </li>
                </>
              )}
              
              {templateId === 'chronological' && (
                <>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Profesionales con trayectoria lineal</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sectores tradicionales y corporativos</span>
                  </li>
                </>
              )}
              
              {templateId === 'creative' && (
                <>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Diseñadores y profesionales creativos</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Startups y empresas innovadoras</span>
                  </li>
                </>
              )}
              
              {templateId === 'executive' && (
                <>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Directivos y altos cargos</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Profesionales con amplia experiencia</span>
                  </li>
                </>
              )}
              
              {templateId === 'twocolumn' && (
                <>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Profesionales técnicos y especializados</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Perfiles con múltiples habilidades</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Ventajas</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Optimizado para sistemas ATS</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Diseño profesional y moderno</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Exportación a PDF de alta calidad</span>
              </li>
            </ul>
          </div>
          
          <div>
            <button 
              onClick={handleUseTemplate}
              className="btn-primary w-full"
            >
              Usar esta plantilla
            </button>
          </div>
        </div>
      </div>

      {/* Modal para plantillas premium */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Plantilla Premium</h3>
              <p className="text-neutral-600 mb-4">
                Esta es una plantilla premium. Actualiza a una cuenta premium para desbloquear todas las plantillas y funciones avanzadas.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <button 
                className="btn-primary"
                onClick={() => window.location.href = '/pricing'}
              >
                Ver planes premium
              </button>
              <button 
                className="btn-outline"
                onClick={() => setShowPremiumModal(false)}
              >
                Volver a la vista previa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview; 