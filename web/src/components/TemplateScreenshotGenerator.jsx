import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { getAllTemplates } from '../utils/templateMapping';
import DefaultTemplateImage from './DefaultTemplateImage';

/**
 * Componente para generar capturas de pantalla de las plantillas
 * Este componente es solo para uso administrativo y no debe ser accesible para los usuarios
 */
const TemplateScreenshotGenerator = () => {
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [currentProfile, setCurrentProfile] = useState('developer');
  const [generationStatus, setGenerationStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);
  
  const templates = getAllTemplates();
  
  // Generar captura de pantalla de la plantilla actual
  const generateScreenshot = async () => {
    if (!previewRef.current) return;
    
    try {
      setIsGenerating(true);
      setGenerationStatus(`Generando captura para ${currentTemplate}...`);
      
      // Esperar a que la vista previa se renderice completamente
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Capturar la vista previa como imagen PNG
      const dataUrl = await toPng(/** @type {HTMLElement} */ (previewRef.current), { 
        quality: 0.95,
        width: 600,
        height: 800,
        style: {
          transform: 'scale(1)',
        }
      });
      
      // Guardar la imagen
      saveAs(dataUrl, `${currentTemplate}-preview.png`);
      
      setGenerationStatus(`Captura de ${currentTemplate} generada correctamente`);
    } catch (error) {
      console.error('Error al generar la captura:', error);
      setGenerationStatus(`Error al generar la captura: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generar capturas para todas las plantillas
  const generateAllScreenshots = async () => {
    setIsGenerating(true);
    setGenerationStatus('Iniciando generación de todas las capturas...');
    
    for (const template of templates) {
      setCurrentTemplate(template.id);
      setGenerationStatus(`Preparando plantilla ${template.id}...`);
      
      // Esperar a que se actualice el estado y se renderice la plantilla
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // Obtener el elemento de vista previa
        const previewElement = document.querySelector(`.template-preview-${template.id}`);
        
        if (!previewElement) {
          throw new Error(`No se encontró el elemento de vista previa para ${template.id}`);
        }
        
        setGenerationStatus(`Generando captura para ${template.id}...`);
        
        // Capturar la vista previa como imagen PNG
        const dataUrl = await toPng(/** @type {HTMLElement} */ (previewElement), { 
          quality: 0.95,
          width: 600,
          height: 800,
          style: {
            transform: 'scale(1)',
          }
        });
        
        // Guardar la imagen
        saveAs(dataUrl, `${template.id}-preview.png`);
        
        setGenerationStatus(`Captura de ${template.id} generada correctamente`);
      } catch (error) {
        console.error(`Error al generar la captura de ${template.id}:`, error);
        setGenerationStatus(`Error al generar la captura de ${template.id}: ${error.message}`);
      }
      
      // Esperar antes de pasar a la siguiente plantilla
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setGenerationStatus('Todas las capturas han sido generadas');
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Generador de Capturas de Plantillas</h1>
      <p className="text-neutral-600 mb-6">
        Esta herramienta genera capturas de pantalla de las plantillas para mostrarlas en la galería.
        Las imágenes se guardarán en tu dispositivo y deberás subirlas manualmente a la carpeta <code>/public/images/templates/</code>.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Configuración</h2>
          
          <div className="mb-4">
            <label htmlFor="template-select" className="block text-sm font-medium text-neutral-700 mb-1">
              Plantilla
            </label>
            <select
              id="template-select"
              value={currentTemplate}
              onChange={(e) => setCurrentTemplate(e.target.value)}
              className="form-select w-full border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              disabled={isGenerating}
            >
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="profile-select" className="block text-sm font-medium text-neutral-700 mb-1">
              Perfil de ejemplo
            </label>
            <select
              id="profile-select"
              value={currentProfile}
              onChange={(e) => setCurrentProfile(e.target.value)}
              className="form-select w-full border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              disabled={isGenerating}
            >
              <option value="developer">Desarrollador</option>
              <option value="marketing">Marketing</option>
              <option value="designer">Diseñador</option>
              <option value="executive">Ejecutivo</option>
            </select>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={generateScreenshot}
              className="btn-primary"
              disabled={isGenerating}
            >
              Generar captura actual
            </button>
            <button 
              onClick={generateAllScreenshots}
              className="btn-outline"
              disabled={isGenerating}
            >
              Generar todas las capturas
            </button>
          </div>
          
          {generationStatus && (
            <div className="mt-4 p-3 bg-neutral-100 rounded-md text-sm text-neutral-700">
              {generationStatus}
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Vista Previa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map(template => (
              <div 
                key={template.id} 
                className={`border border-neutral-200 rounded-lg overflow-hidden ${
                  currentTemplate === template.id ? 'ring-2 ring-primary-500' : ''
                } template-preview-${template.id}`}
                ref={currentTemplate === template.id ? previewRef : null}
              >
                <div className="p-2 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">{template.name}</span>
                  {template.premium && (
                    <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Premium</span>
                  )}
                </div>
                <div className="h-[600px] bg-white">
                  <DefaultTemplateImage 
                    templateId={template.id} 
                    profileType={currentProfile} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Nota:</strong> Este componente es solo para uso administrativo. Después de generar las capturas, debes:
            </p>
            <ol className="mt-2 text-sm text-yellow-700 list-decimal list-inside">
              <li>Guardar las imágenes en tu dispositivo</li>
              <li>Subirlas a la carpeta <code>/public/images/templates/</code></li>
              <li>Asegurarte de que los nombres coincidan con los definidos en <code>templateScreenshots.js</code></li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Consejo:</strong> Esta herramienta ahora utiliza las vistas previas simplificadas para generar las capturas, lo que debería funcionar de manera más confiable que intentar capturar los PDFs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateScreenshotGenerator; 