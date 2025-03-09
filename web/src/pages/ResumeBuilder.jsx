import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import ChronologicalTemplate from '../templates/ChronologicalTemplate';
import TwoColumnTemplate from '../templates/TwoColumnTemplate';
import { getAllTemplates } from '../utils/templateMapping';

// Componente temporal para la vista previa del PDF
const PDFPreview = ({ data, templateId }) => {
  // Renderiza una versión simplificada basada en la plantilla seleccionada
  const renderPreviewByTemplate = () => {
    switch(templateId) {
      case 'modern':
        return (
          <div className="modern-preview">
            <div className="flex flex-col items-center">
              {data.personalInfo.photo && (
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border border-gray-300">
                  <img 
                    src={data.personalInfo.photo} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold text-center">{data.personalInfo.name || 'Nombre Completo'}</h1>
              <p className="text-center text-gray-600">{data.personalInfo.title || 'Título Profesional'}</p>
              <div className="flex justify-center gap-4 mt-2 text-sm">
                <p>{data.personalInfo.email || 'email@ejemplo.com'}</p>
                <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
                <p>{data.personalInfo.location || 'Ciudad, País'}</p>
              </div>
            </div>
            <hr className="my-4" />
            {data.personalInfo.summary && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Perfil Profesional</h2>
                <pre className="whitespace-pre-wrap text-sm font-sans">{data.personalInfo.summary}</pre>
              </div>
            )}
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Experiencia</h2>
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-gray-600">{exp.company}, {exp.location}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu experiencia laboral</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Educación</h2>
              {data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                    <p className="text-sm mt-1">{edu.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu información educativa</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Habilidades</h2>
              {data.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Agrega tus habilidades</p>
              )}
            </div>
          </div>
        );
      case 'minimalist':
        return (
          <div className="minimalist-preview">
            <h1 className="text-2xl font-bold">{data.personalInfo.name || 'Nombre Completo'}</h1>
            <p className="text-gray-600">{data.personalInfo.title || 'Título Profesional'}</p>
            <div className="mt-2 text-sm">
              <p>{data.personalInfo.email || 'email@ejemplo.com'} • {data.personalInfo.phone || '(123) 456-7890'} • {data.personalInfo.location || 'Ciudad, País'}</p>
            </div>
            <hr className="my-3" />
            <div className="mt-3">
              <h2 className="text-lg font-bold mb-2 uppercase">Experiencia</h2>
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu experiencia laboral</p>
              )}
            </div>
            <div className="mt-3">
              <h2 className="text-lg font-bold mb-2 uppercase">Educación</h2>
              {data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu información educativa</p>
              )}
            </div>
            <div className="mt-3">
              <h2 className="text-lg font-bold mb-2 uppercase">Habilidades</h2>
              {data.skills.length > 0 ? (
                <p>{data.skills.join(', ')}</p>
              ) : (
                <p className="text-gray-500">Agrega tus habilidades</p>
              )}
            </div>
          </div>
        );
      case 'creative':
        return (
          <div className="creative-preview bg-gradient-to-r from-blue-50 to-purple-50 p-4">
            <h1 className="text-2xl font-bold text-purple-700">{data.personalInfo.name || 'Nombre Completo'}</h1>
            <p className="text-purple-600">{data.personalInfo.title || 'Título Profesional'}</p>
            <div className="mt-2 text-sm flex gap-3">
              <p>{data.personalInfo.email || 'email@ejemplo.com'}</p>
              <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2 text-purple-700 border-b border-purple-200">Experiencia</h2>
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-purple-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu experiencia laboral</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2 text-purple-700 border-b border-purple-200">Educación</h2>
              {data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-purple-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu información educativa</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2 text-purple-700 border-b border-purple-200">Habilidades</h2>
              {data.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Agrega tus habilidades</p>
              )}
            </div>
          </div>
        );
      case 'executive':
        return (
          <div className="executive-preview border-t-4 border-gray-800 pt-4">
            <h1 className="text-2xl font-bold">{data.personalInfo.name || 'Nombre Completo'}</h1>
            <p className="text-gray-700 font-semibold">{data.personalInfo.title || 'Título Profesional'}</p>
            <div className="mt-2 text-sm">
              <p>{data.personalInfo.email || 'email@ejemplo.com'} | {data.personalInfo.phone || '(123) 456-7890'} | {data.personalInfo.location || 'Ciudad, País'}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">EXPERIENCIA PROFESIONAL</h2>
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.company}</h3>
                      <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="italic">{exp.position}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu experiencia laboral</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">EDUCACIÓN</h2>
              {data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{edu.institution}</h3>
                      <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="italic">{edu.degree}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu información educativa</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">HABILIDADES</h2>
              {data.skills.length > 0 ? (
                <p>{data.skills.join(' • ')}</p>
              ) : (
                <p className="text-gray-500">Agrega tus habilidades</p>
              )}
            </div>
          </div>
        );
      case 'chronological':
        return (
          <div className="chronological-preview">
            <h1 className="text-2xl font-bold text-center">{data.personalInfo.name || 'Nombre Completo'}</h1>
            <p className="text-center">{data.personalInfo.title || 'Título Profesional'}</p>
            <div className="flex justify-center gap-3 mt-2 text-sm">
              <p>{data.personalInfo.email || 'email@ejemplo.com'}</p>
              <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
              <p>{data.personalInfo.location || 'Ciudad, País'}</p>
            </div>
            <hr className="my-3" />
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Experiencia Profesional</h2>
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p>{exp.company}, {exp.location}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu experiencia laboral</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Educación</h2>
              {data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p>{edu.institution}, {edu.location}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu información educativa</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Habilidades</h2>
              {data.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Agrega tus habilidades</p>
              )}
            </div>
          </div>
        );
      case 'twocolumn':
        return (
          <div className="twocolumn-preview flex">
            <div className="w-1/3 bg-gray-100 p-3">
              <h1 className="text-xl font-bold">{data.personalInfo.name || 'Nombre Completo'}</h1>
              <p className="text-gray-700">{data.personalInfo.title || 'Título Profesional'}</p>
              <div className="mt-3">
                <h2 className="text-md font-bold mb-1">Contacto</h2>
                <p className="text-sm">{data.personalInfo.email || 'email@ejemplo.com'}</p>
                <p className="text-sm">{data.personalInfo.phone || '(123) 456-7890'}</p>
                <p className="text-sm">{data.personalInfo.location || 'Ciudad, País'}</p>
              </div>
              <div className="mt-3">
                <h2 className="text-md font-bold mb-1">Habilidades</h2>
                {data.skills.length > 0 ? (
                  <div>
                    {data.skills.map((skill, index) => (
                      <p key={index} className="text-sm mb-1">{skill}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Agrega tus habilidades</p>
                )}
              </div>
            </div>
            <div className="w-2/3 p-3">
              <div className="mb-3">
                <h2 className="text-lg font-bold mb-1">Experiencia</h2>
                {data.experience.length > 0 ? (
                  data.experience.map((exp, index) => (
                    <div key={index} className="mb-2">
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                      <p className="text-xs mt-1">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Agrega tu experiencia laboral</p>
                )}
              </div>
              <div className="mb-3">
                <h2 className="text-lg font-bold mb-1">Educación</h2>
                {data.education.length > 0 ? (
                  data.education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Agrega tu información educativa</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="default-preview">
            <h1 className="text-2xl font-bold">{data.personalInfo.name || 'Nombre Completo'}</h1>
            <p className="text-gray-600">{data.personalInfo.title || 'Título Profesional'}</p>
            <div className="mt-4">
              <p>{data.personalInfo.email || 'email@ejemplo.com'}</p>
              <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
              <p>{data.personalInfo.location || 'Ciudad, País'}</p>
            </div>
            <hr className="my-4" />
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Experiencia</h2>
              {data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                    <p>{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu experiencia laboral</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Educación</h2>
              {data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                    <p>{edu.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Agrega tu información educativa</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Habilidades</h2>
              {data.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Agrega tus habilidades</p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      {renderPreviewByTemplate()}
    </div>
  );
};

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'modern';
  const [isClient, setIsClient] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  useEffect(() => {
    setIsClient(true);
    
    // Encontrar la plantilla seleccionada
    const selected = getAllTemplates().find(t => t.id === templateId) || getAllTemplates()[0];
    setSelectedTemplate(selected);
    
    // Cargar datos del localStorage si están disponibles
    const savedResumeData = localStorage.getItem('resumeData');
    if (savedResumeData) {
      try {
        const parsedData = JSON.parse(savedResumeData);
        setResumeData(parsedData);
        // Limpiar localStorage después de cargar los datos
        localStorage.removeItem('resumeData');
      } catch (error) {
        console.error('Error al cargar los datos guardados:', error);
      }
    }
  }, [templateId]);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      photo: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    certifications: [],
  });

  const [activeSection, setActiveSection] = useState('personalInfo');
  const [newExperience, setNewExperience] = useState({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [newSkill, setNewSkill] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Archivo seleccionado:", file);
      
      // Verificar que el archivo es una imagen
      if (!file.type.startsWith('image/')) {
        console.error("El archivo seleccionado no es una imagen");
        return;
      }
      
      // Crear una URL para la imagen
      const imageUrl = URL.createObjectURL(file);
      console.log("URL de la imagen creada:", imageUrl);
      
      // Cargar la imagen para asegurarnos de que se carga correctamente
      const img = new Image();
      img.onload = () => {
        console.log("Imagen cargada correctamente, dimensiones:", img.width, "x", img.height);
        
        // Crear un canvas para convertir la imagen a base64
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Establecer las dimensiones del canvas
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0);
        
        // Convertir el canvas a base64
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          console.log("Base64 generado correctamente");
          
          // Actualizar el estado con la imagen
          setResumeData({
            ...resumeData,
            personalInfo: {
              ...resumeData.personalInfo,
              photo: dataUrl,
            },
          });
          
          console.log("Estado actualizado con la imagen");
        } catch (error) {
          console.error("Error al convertir la imagen a base64:", error);
        }
      };
      
      img.onerror = (error) => {
        console.error("Error al cargar la imagen:", error);
      };
      
      img.src = imageUrl;
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleAddExperience = () => {
    if (newExperience.position && newExperience.company) {
      setResumeData({
        ...resumeData,
        experience: [...resumeData.experience, newExperience],
      });
      setNewExperience({
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, newEducation],
      });
      setNewEducation({
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill],
      });
      setNewSkill('');
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  // Función para seleccionar la plantilla según el ID
  const getResumeTemplate = () => {
    console.log("Datos del CV para PDF:", resumeData); // Añadir log para depuración
    console.log("Foto:", resumeData.personalInfo.photo); // Verificar si la foto está presente
    
    switch(templateId) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'chronological':
        return <ChronologicalTemplate data={resumeData} />;
      case 'twocolumn':
        return <TwoColumnTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Constructor de Currículum</h1>
      
      {/* Indicador de plantilla seleccionada */}
      {selectedTemplate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-3 sm:mb-0">
              <p className="text-blue-800">
                <span className="font-semibold">Plantilla seleccionada:</span> {selectedTemplate.name}
              </p>
              <div className="text-blue-600 text-sm">{selectedTemplate.description}</div>
            </div>
            <div 
              onClick={() => {
                // Guardar los datos actuales en localStorage antes de cambiar de plantilla
                localStorage.setItem('tempResumeData', JSON.stringify(resumeData));
              }}
            >
              <Link 
                to="/templates" 
                className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Cambiar plantilla
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Panel de edición */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 ${activeSection === 'personalInfo' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveSection('personalInfo')}
              >
                Información Personal
              </button>
              <button
                className={`px-4 py-2 ${activeSection === 'experience' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveSection('experience')}
              >
                Experiencia
              </button>
              <button
                className={`px-4 py-2 ${activeSection === 'education' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveSection('education')}
              >
                Educación
              </button>
              <button
                className={`px-4 py-2 ${activeSection === 'skills' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveSection('skills')}
              >
                Habilidades
              </button>
            </div>

            {/* Sección de Información Personal */}
            {activeSection === 'personalInfo' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Información Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={resumeData.personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Foto de Perfil</label>
                    <div className="flex items-center space-x-4">
                      {resumeData.personalInfo.photo && (
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border border-gray-300">
                          <img 
                            src={resumeData.personalInfo.photo} 
                            alt="Foto de perfil" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Título Profesional</label>
                    <input
                      type="text"
                      name="title"
                      value={resumeData.personalInfo.title}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ej. Desarrollador Web"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={resumeData.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ej. juan@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="text"
                      name="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ej. (123) 456-7890"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Ubicación</label>
                    <input
                      type="text"
                      name="location"
                      value={resumeData.personalInfo.location}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ej. Ciudad, País"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Resumen Profesional</label>
                    <textarea
                      id="summary"
                      name="summary"
                      value={resumeData.personalInfo.summary}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={10}
                      placeholder="Breve descripción de tu perfil profesional..."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Sección de Experiencia */}
            {activeSection === 'experience' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Experiencia Laboral</h2>
                
                {/* Formulario para agregar experiencia */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-bold mb-3">Agregar Experiencia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Puesto</label>
                      <input
                        type="text"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Desarrollador Frontend"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Empresa</label>
                      <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Empresa XYZ"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
                      <input
                        type="text"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Enero 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Fecha de Fin</label>
                      <input
                        type="text"
                        value={newExperience.endDate}
                        onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Actual o Diciembre 2022"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Descripción</label>
                      <textarea
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                        placeholder="Describe tus responsabilidades y logros..."
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={handleAddExperience}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Agregar Experiencia
                  </button>
                </div>

                {/* Lista de experiencias */}
                <div>
                  <h3 className="font-bold mb-3">Experiencias Agregadas</h3>
                  {resumeData.experience.length > 0 ? (
                    resumeData.experience.map((exp, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md mb-3 relative">
                        <button
                          onClick={() => handleRemoveExperience(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                        <h4 className="font-bold">{exp.position}</h4>
                        <p>{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No has agregado experiencias todavía.</p>
                  )}
                </div>
              </div>
            )}

            {/* Sección de Educación */}
            {activeSection === 'education' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Educación</h2>
                
                {/* Formulario para agregar educación */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-bold mb-3">Agregar Educación</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Título/Grado</label>
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Licenciatura en Informática"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Institución</label>
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Universidad XYZ"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
                      <input
                        type="text"
                        value={newEducation.startDate}
                        onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Septiembre 2016"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Fecha de Fin</label>
                      <input
                        type="text"
                        value={newEducation.endDate}
                        onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ej. Junio 2020"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Descripción</label>
                      <textarea
                        value={newEducation.description}
                        onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                        placeholder="Información adicional sobre tu educación..."
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={handleAddEducation}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Agregar Educación
                  </button>
                </div>

                {/* Lista de educación */}
                <div>
                  <h3 className="font-bold mb-3">Educación Agregada</h3>
                  {resumeData.education.length > 0 ? (
                    resumeData.education.map((edu, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md mb-3 relative">
                        <button
                          onClick={() => handleRemoveEducation(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                        <h4 className="font-bold">{edu.degree}</h4>
                        <p>{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No has agregado educación todavía.</p>
                  )}
                </div>
              </div>
            )}

            {/* Sección de Habilidades */}
            {activeSection === 'skills' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Habilidades</h2>
                
                {/* Formulario para agregar habilidades */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-bold mb-3">Agregar Habilidad</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-grow px-3 py-2 border rounded-md"
                      placeholder="Ej. JavaScript"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <button
                      onClick={handleAddSkill}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                </div>

                {/* Lista de habilidades */}
                <div>
                  <h3 className="font-bold mb-3">Habilidades Agregadas</h3>
                  {resumeData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No has agregado habilidades todavía.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Exportar</h2>
            <p className="mb-4">Una vez que hayas completado tu currículum, puedes descargarlo como PDF.</p>
            {isClient && (
              <PDFDownloadLink 
                document={getResumeTemplate()} 
                fileName={`cv-${resumeData.personalInfo.name || 'curriculum'}.pdf`}
                className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {({ loading }) =>
                  loading ? 'Generando PDF...' : 'Descargar PDF'
                }
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {/* Vista previa */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Vista Previa</h2>
            <div className="border rounded-lg overflow-hidden">
              <PDFPreview data={resumeData} templateId={templateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 