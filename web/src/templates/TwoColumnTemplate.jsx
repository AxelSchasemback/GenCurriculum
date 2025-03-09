import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  leftColumn: {
    width: '30%',
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRight: '1 solid #E5E7EB',
  },
  leftHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  rightColumn: {
    width: '65%',
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 10,
  },
  contactSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 4,
    color: '#495057',
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 4,
    marginTop: 6,
  },
  skillItem: {
    fontSize: 10,
    color: '#495057',
    marginBottom: 2,
  },
  skillBar: {
    height: 3,
    backgroundColor: '#E9ECEF',
    marginTop: 1,
    marginBottom: 4,
  },
  skillLevel: {
    height: 4,
    backgroundColor: '#4C6EF5',
  },
  languagesSection: {
    marginBottom: 15,
  },
  language: {
    fontSize: 10,
    color: '#495057',
    marginBottom: 2,
  },
  mainSection: {
    marginBottom: 20,
  },
  mainSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    color: '#495057',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#212529',
  },
  jobPeriod: {
    fontSize: 10,
    color: '#6C757D',
    fontStyle: 'italic',
  },
  company: {
    fontSize: 11,
    color: '#495057',
    marginBottom: 5,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 5,
  },
  bulletPoint: {
    width: 3,
    height: 3,
    backgroundColor: '#4C6EF5',
    borderRadius: 1,
    marginRight: 5,
    marginTop: 4,
  },
  description: {
    fontSize: 10,
    color: '#6C757D',
    lineHeight: 1.5,
    flex: 1,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#212529',
  },
  institution: {
    fontSize: 10,
    color: '#495057',
  },
  educationPeriod: {
    fontSize: 10,
    color: '#6C757D',
    fontStyle: 'italic',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 15,
    alignSelf: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
});

// Componente para el PDF
const TwoColumnTemplate = ({ data }) => {
  console.log("TwoColumnTemplate recibió datos:", data);
  console.log("Foto en TwoColumnTemplate:", data.personalInfo.photo);
  
  // Verificar si la foto es una URL base64 válida
  const hasValidPhoto = data.personalInfo.photo && 
    (data.personalInfo.photo.startsWith('data:image/') || 
     data.personalInfo.photo.startsWith('http'));
  
  // Crear una imagen con dimensiones fijas para evitar problemas de renderizado
  const processedPhoto = hasValidPhoto ? data.personalInfo.photo : null;
  
  console.log("¿Tiene foto válida?", hasValidPhoto);
  console.log("Foto procesada:", processedPhoto ? "Sí" : "No");
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Columna izquierda */}
        <View style={styles.leftColumn}>
          {/* Nombre y título */}
          <View style={styles.leftHeader}>
            {processedPhoto && (
              <View style={styles.photoContainer}>
                <Image 
                  src={processedPhoto} 
                  style={styles.photo} 
                  cache={false}
                />
              </View>
            )}
            <Text style={styles.name}>{data.personalInfo.name || 'Nombre Completo'}</Text>
            <Text style={styles.title}>{data.personalInfo.title || 'Título Profesional'}</Text>
          </View>

          {/* Sección de contacto */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contacto</Text>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>Email: {data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>Teléfono: {data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>Ubicación: {data.personalInfo.location}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>Web: {data.personalInfo.website}</Text>
            )}
          </View>

          {/* Sección de habilidades - Reorganizada para evitar superposición */}
          {data.skills && data.skills.length > 0 && (
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Habilidades</Text>
              
              {/* Dividir las habilidades en dos grupos sin superposición */}
              <View>
                {/* Primer grupo: Habilidades Técnicas */}
                <Text style={styles.skillCategory}>Habilidades Técnicas</Text>
                {data.skills.slice(0, Math.min(3, Math.ceil(data.skills.length / 2))).map((skill, index) => (
                  <View key={`tech-${index}`}>
                    <Text style={styles.skillItem}>{skill}</Text>
                    <View style={styles.skillBar}>
                      <View style={[styles.skillLevel, { width: `${Math.random() * 40 + 60}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
              
              {/* Espacio de separación entre grupos */}
              <View style={{ marginTop: 4 }}></View>
              
              {/* Segundo grupo: Habilidades Blandas */}
              <View>
                <Text style={styles.skillCategory}>Habilidades Blandas</Text>
                {data.skills.slice(Math.ceil(data.skills.length / 2), Math.min(data.skills.length, Math.ceil(data.skills.length / 2) + 2)).map((skill, index) => (
                  <View key={`soft-${index}`}>
                    <Text style={styles.skillItem}>{skill}</Text>
                    <View style={styles.skillBar}>
                      <View style={[styles.skillLevel, { width: `${Math.random() * 40 + 60}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Sección de idiomas (reducida) */}
          <View style={styles.languagesSection}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            <View>
              <Text style={styles.language}>Español - Nativo</Text>
              <View style={styles.skillBar}>
                <View style={[styles.skillLevel, { width: '100%' }]} />
              </View>
            </View>
            <View>
              <Text style={styles.language}>Inglés - Avanzado</Text>
              <View style={styles.skillBar}>
                <View style={[styles.skillLevel, { width: '85%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Columna derecha con experiencia y educación */}
        <View style={styles.rightColumn}>
          {/* Perfil profesional */}
          {data.personalInfo.summary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Perfil Profesional</Text>
              <Text style={styles.summary}>{data.personalInfo.summary}</Text>
            </View>
          )}

          {/* Sección de experiencia */}
          {data.experience && data.experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Experiencia Profesional</Text>
              {data.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.jobPeriod}>{exp.startDate} - {exp.endDate || 'Presente'}</Text>
                  </View>
                  <Text style={styles.company}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                  
                  {exp.description && (
                    <View style={styles.bulletContainer}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.description}>{exp.description}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Sección de educación */}
          {data.education && data.education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Formación Académica</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.educationPeriod}>{edu.startDate} - {edu.endDate || 'Presente'}</Text>
                  </View>
                  <Text style={styles.institution}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</Text>
                  {edu.description && (
                    <View style={styles.bulletContainer}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.description}>{edu.description}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Sección de proyectos (opcional) */}
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>Proyectos Destacados</Text>
            <View style={styles.experienceItem}>
              <Text style={styles.jobTitle}>Proyecto Personal</Text>
              <Text style={styles.company}>Aplicación de Gestión de Currículums</Text>
              <View style={styles.bulletContainer}>
                <View style={styles.bulletPoint} />
                <Text style={styles.description}>
                  Desarrollo de una aplicación web para la creación y gestión de currículums profesionales con múltiples plantillas.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TwoColumnTemplate; 