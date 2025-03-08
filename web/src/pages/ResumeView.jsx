import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchResumeById, getCurrentUser, deleteResume } from '../utils/supabase';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import ChronologicalTemplate from '../templates/ChronologicalTemplate';
import TwoColumnTemplate from '../templates/TwoColumnTemplate';

export default function ResumeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (!user) return;
        
        const { resume: data, error: resumeError } = await fetchResumeById(id, user.id);
        
        if (resumeError) {
          throw resumeError;
        }
        
        if (!data) {
          setError('No se encontró el currículum solicitado');
          return;
        }
        
        setResume(data);
      } catch (err) {
        console.error('Error al cargar el currículum:', err);
        setError('Error al cargar el currículum. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [id, user]);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      setLoading(true);
      const { error: deleteError } = await deleteResume(id, user.id);
      
      if (deleteError) {
        throw deleteError;
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al eliminar el currículum:', err);
      setError('Error al eliminar el currículum. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Cargando currículum...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <Link to="/dashboard" className="btn-outline">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!resume) {
    return null;
  }

  // Renderizar el componente de plantilla correcto según el ID
  const renderTemplate = () => {
    switch (resume.templateId) {
      case 'modern':
        return <ModernTemplate data={resume} />;
      case 'minimalist':
        return <MinimalistTemplate data={resume} />;
      case 'creative':
        return <CreativeTemplate data={resume} />;
      case 'executive':
        return <ExecutiveTemplate data={resume} />;
      case 'chronological':
        return <ChronologicalTemplate data={resume} />;
      case 'twocolumn':
        return <TwoColumnTemplate data={resume} />;
      default:
        return <ModernTemplate data={resume} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{resume.personalInfo.name}</h1>
          <p className="text-neutral-600">{resume.personalInfo.title}</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <PDFDownloadLink
            document={renderTemplate()}
            fileName={`${resume.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`}
            className="btn-primary"
          >
            {({ loading: pdfLoading }) =>
              pdfLoading ? 'Generando PDF...' : 'Descargar PDF'
            }
          </PDFDownloadLink>
          
          <Link to={`/resume/edit/${id}`} className="btn-outline">
            Editar
          </Link>
          
          <button 
            onClick={handleDelete} 
            className={`btn ${deleteConfirm ? 'bg-red-600 hover:bg-red-700' : 'bg-neutral-600 hover:bg-neutral-700'} text-white`}
          >
            {deleteConfirm ? 'Confirmar Eliminación' : 'Eliminar'}
          </button>
          
          <Link to="/dashboard" className="btn-outline">
            Volver
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Vista Previa</h2>
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <div className="aspect-[1/1.414] bg-neutral-100 flex items-center justify-center">
            <div className="w-full h-full max-w-[595px] max-h-[842px] overflow-hidden bg-white shadow-lg">
              {/* Aquí iría una vista previa del PDF, pero como no podemos renderizar el PDF directamente,
                  mostramos un mensaje informativo */}
              <div className="flex items-center justify-center h-full p-8 text-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-neutral-600 mb-4">
                    Vista previa no disponible. Descarga el PDF para ver el currículum completo.
                  </p>
                  <PDFDownloadLink
                    document={renderTemplate()}
                    fileName={`${resume.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`}
                    className="btn-primary"
                  >
                    {({ loading: pdfLoading }) =>
                      pdfLoading ? 'Generando PDF...' : 'Descargar PDF'
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Detalles del Currículum</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Nombre</p>
              <p className="text-neutral-800">{resume.personalInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Título</p>
              <p className="text-neutral-800">{resume.personalInfo.title}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Email</p>
              <p className="text-neutral-800">{resume.personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Teléfono</p>
              <p className="text-neutral-800">{resume.personalInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Ubicación</p>
              <p className="text-neutral-800">{resume.personalInfo.location}</p>
            </div>
            {resume.personalInfo.website && (
              <div>
                <p className="text-sm text-neutral-500">Sitio Web</p>
                <p className="text-neutral-800">{resume.personalInfo.website}</p>
              </div>
            )}
          </div>
          {resume.personalInfo.summary && (
            <div className="mt-4">
              <p className="text-sm text-neutral-500">Resumen Profesional</p>
              <p className="text-neutral-800">{resume.personalInfo.summary}</p>
            </div>
          )}
        </div>
        
        {resume.experience && resume.experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Experiencia Laboral</h3>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-neutral-200 last:border-0">
                <div className="flex justify-between">
                  <p className="font-medium text-neutral-800">{exp.position}</p>
                  <p className="text-sm text-neutral-500">{exp.startDate} - {exp.endDate || 'Presente'}</p>
                </div>
                <p className="text-neutral-600">{exp.company}</p>
                <p className="text-sm text-neutral-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {resume.education && resume.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Educación</h3>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-neutral-200 last:border-0">
                <div className="flex justify-between">
                  <p className="font-medium text-neutral-800">{edu.degree}</p>
                  <p className="text-sm text-neutral-500">{edu.startDate} - {edu.endDate || 'Presente'}</p>
                </div>
                <p className="text-neutral-600">{edu.institution}</p>
                {edu.description && <p className="text-sm text-neutral-700 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span key={index} className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 