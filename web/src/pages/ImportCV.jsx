import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axelCvData } from '../data/axel-cv-data';

const ImportCV = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImport = () => {
    setLoading(true);
    setError(null);
    
    try {
      // Guardar los datos en localStorage para que estén disponibles en el constructor de CV
      localStorage.setItem('resumeData', JSON.stringify(axelCvData));
      setSuccess(true);
      
      // Esperar un momento antes de redirigir para mostrar el mensaje de éxito
      setTimeout(() => {
        navigate('/builder?template=modern');
      }, 1500);
    } catch (err) {
      console.error('Error al importar los datos:', err);
      setError('Ocurrió un error al importar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Importar CV de Axel Schasemback</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Información que se importará:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-medium">Información personal:</span> Nombre, título, contacto y resumen profesional</li>
            <li><span className="font-medium">Experiencia laboral:</span> {axelCvData.experience.length} entradas</li>
            <li><span className="font-medium">Educación:</span> {axelCvData.education.length} entradas</li>
            <li><span className="font-medium">Habilidades:</span> {axelCvData.skills.length} habilidades</li>
            <li><span className="font-medium">Idiomas:</span> {axelCvData.languages.length} idiomas</li>
            <li><span className="font-medium">Proyectos:</span> {axelCvData.projects.length} proyectos</li>
            <li><span className="font-medium">Certificaciones:</span> {axelCvData.certifications.length} certificaciones</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <span className="font-semibold">Nota:</span> Al importar estos datos, se cargarán automáticamente en el constructor de CV con la plantilla "Modern". Podrás editar cualquier información o cambiar la plantilla después de la importación.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            ¡Datos importados correctamente! Redirigiendo al constructor de CV...
          </div>
        )}
        
        <div className="flex justify-center">
          <button
            onClick={handleImport}
            disabled={loading || success}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              loading || success ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Importando...' : success ? 'Importado con éxito' : 'Importar datos del CV'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCV; 