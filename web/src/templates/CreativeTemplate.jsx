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
    backgroundColor: '#6B46C1',
    padding: 20,
    borderRadius: 5,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
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
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    color: '#E9D5FF', // Púrpura claro
    marginBottom: 20,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#E9D5FF', // Púrpura claro
  },
  skillsSection: {
    marginTop: 30,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skill: {
    fontSize: 10,
    marginBottom: 8,
    color: '#E9D5FF', // Púrpura claro
  },
  skillBar: {
    height: 4,
    backgroundColor: '#8B5CF6', // Púrpura medio
    marginTop: 2,
  },
  mainSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5B21B6', // Púrpura
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#F3F4F6', // Gris claro
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937', // Gris oscuro
  },
  jobDetails: {
    fontSize: 10,
    color: '#6B7280', // Gris medio
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: '#4B5563', // Gris
    lineHeight: 1.5,
  },
  profileSummary: {
    fontSize: 10,
    color: '#4B5563', // Gris
    lineHeight: 1.6,
    marginBottom: 20,
  },
});

// Componente para el PDF
const CreativeTemplate = ({ data }) => {
  console.log("CreativeTemplate recibió datos:", data);
  console.log("Foto en CreativeTemplate:", data.personalInfo.photo);
  
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
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Contacto</Text>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            )}
          </View>

          {/* Habilidades con barras de nivel */}
          {data.skills.length > 0 && (
            <View style={styles.skillsSection}>
              <Text style={styles.skillsTitle}>Habilidades</Text>
              {data.skills.map((skill, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={styles.skill}>{skill}</Text>
                  <View style={[styles.skillBar, { width: `${Math.random() * 50 + 50}%` }]} />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Contenido principal */}
        <View style={styles.mainSection}>
          {/* Perfil Profesional */}
          {data.personalInfo.summary && (
            <View style={styles.experienceItem}>
              <Text style={styles.sectionTitle}>Perfil Profesional</Text>
              <Text style={styles.profileSummary}>{data.personalInfo.summary}</Text>
            </View>
          )}

          {/* Sección de Experiencia */}
          {data.experience.length > 0 && (
            <View style={styles.experienceItem}>
              <Text style={styles.sectionTitle}>Experiencia</Text>
              {data.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobDetails}>
                    {exp.company} | {exp.startDate} - {exp.endDate || 'Presente'}
                  </Text>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Sección de Educación */}
          {data.education.length > 0 && (
            <View style={styles.experienceItem}>
              <Text style={styles.sectionTitle}>Educación</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.jobDetails}>
                    {edu.institution} | {edu.startDate} - {edu.endDate || 'Presente'}
                  </Text>
                  <Text style={styles.description}>{edu.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CreativeTemplate; 