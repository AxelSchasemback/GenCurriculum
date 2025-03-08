import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchUserResumes, deleteResume } from '../utils/supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user: currentUser, error: userError } = await getCurrentUser();
      
      if (userError || !currentUser) {
        navigate('/login');
        return;
      }

      setUser(currentUser);
      loadResumes(currentUser.id);
    } catch (err) {
      console.error('Error al verificar autenticación:', err);
      navigate('/login');
    }
  };

  const loadResumes = async (userId) => {
    try {
      setLoading(true);
      const { resumes: userResumes, error: resumesError } = await fetchUserResumes(userId);
      
      if (resumesError) {
        throw resumesError;
      }

      setResumes(userResumes || []);
    } catch (err) {
      console.error('Error al cargar currículums:', err);
      setError('No se pudieron cargar tus currículums. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este currículum?')) {
      return;
    }

    try {
      setLoading(true);
      const { error: deleteError } = await deleteResume(resumeId, user.id);
      
      if (deleteError) {
        throw deleteError;
      }

      // Actualizar la lista de currículums
      setResumes(resumes.filter(resume => resume.id !== resumeId));
    } catch (err) {
      console.error('Error al eliminar currículum:', err);
      setError('No se pudo eliminar el currículum. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Currículums</h1>
        <Link
          to="/templates"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Crear Nuevo Currículum
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : resumes.length === 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-10 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No tienes currículums</h3>
          <p className="mt-2 text-sm text-gray-500">
            Comienza creando tu primer currículum para destacar profesionalmente.
          </p>
          <div className="mt-6">
            <Link
              to="/templates"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Crear Mi Primer Currículum
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {resumes.map((resume) => (
              <li key={resume.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900 truncate">{resume.title}</h2>
                      <div className="flex items-center text-sm text-gray-500">
                        <p className="truncate">{resume.personalInfo.name}</p>
                        <span className="mx-1">•</span>
                        <p>{resume.personalInfo.title}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Actualizado: {formatDate(resume.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/resume/${resume.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/resume/edit/${resume.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 