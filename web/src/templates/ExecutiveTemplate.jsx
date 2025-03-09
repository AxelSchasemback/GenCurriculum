import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #333333',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  photoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 14,
    color: '#334155', // Azul grisáceo
    marginTop: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#475569', // Gris azulado
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A', // Azul muy oscuro
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0', // Gris muy claro
    paddingBottom: 3,
  },
  summary: {
    fontSize: 11,
    color: '#334155', // Azul grisáceo
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F172A', // Azul muy oscuro
  },
  jobPeriod: {
    fontSize: 10,
    color: '#475569', // Gris azulado
    fontStyle: 'italic',
  },
  company: {
    fontSize: 11,
    color: '#334155', // Azul grisáceo
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    color: '#475569', // Gris azulado
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A', // Azul muy oscuro
  },
  institution: {
    fontSize: 10,
    color: '#334155', // Azul grisáceo
  },
  educationPeriod: {
    fontSize: 10,
    color: '#475569', // Gris azulado
    fontStyle: 'italic',
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    color: '#334155', // Azul grisáceo
    backgroundColor: '#F1F5F9', // Gris muy claro
    padding: '4 8',
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#94A3B8', // Gris claro
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0', // Gris muy claro
    paddingTop: 10,
  },
});

// Componente para el PDF
const ExecutiveTemplate = ({ data }) => {
  console.log("ExecutiveTemplate recibió datos:", data);
  console.log("Foto en ExecutiveTemplate:", data.personalInfo.photo);
  
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
        {/* Encabezado con información personal */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.personalInfo.name || 'Nombre Completo'}</Text>
            <Text style={styles.title}>{data.personalInfo.title || 'Título Profesional'}</Text>
            
            <View style={styles.contactInfo}>
              {data.personalInfo.email && (
                <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
              )}
              {data.personalInfo.phone && (
                <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
              )}
              {data.personalInfo.location && (
                <Text style={styles.contactInfo}>{data.personalInfo.location}</Text>
              )}
              {data.personalInfo.website && (
                <Text style={styles.contactInfo}>{data.personalInfo.website}</Text>
              )}
            </View>
          </View>
          
          {processedPhoto && (
            <View style={styles.photoContainer}>
              <Image 
                src={processedPhoto} 
                style={styles.photo} 
                cache={false}
              />
            </View>
          )}
        </View>

        {/* Perfil Profesional */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Sección de Experiencia */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobPeriod}>{exp.startDate} - {exp.endDate || 'Presente'}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Sección de Educación */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formación Académica</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.educationPeriod}>{edu.startDate} - {edu.endDate || 'Presente'}</Text>
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Sección de Habilidades */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competencias</Text>
            <View style={styles.skills}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>Currículum actualizado a {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ExecutiveTemplate; 